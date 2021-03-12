import React, { Component } from "preact/compat";
import type { ComponentChild } from "preact";
import equal from "fast-deep-equal/react";
import { tsParticles, Container } from "tsparticles-engine";
import type { IParticlesProps } from "./IParticlesProps";
import type { IParticlesState } from "./IParticlesState";
import type { ISourceOptions } from "tsparticles-engine";
import { MutableRefObject } from "react";

/**
 * @param {{id?: string,width?: string,height?: string,options?: ISourceOptions,params?: ISourceOptions,url?: string,style?: CSSProperties,className?: string,canvasClassName?: string,container?: RefObject<Container>}}
 */
export default class Particles extends Component<IParticlesProps, IParticlesState> {
    public static defaultProps: IParticlesProps = {
        width: "100%",
        height: "100%",
        options: {},
        style: {},
        id: "tsparticles",
    };

    constructor(props: IParticlesProps) {
        super(props);

        this.state = {
            library: undefined,
        };
    }

    public destroy(): void {
        if (!this.state.library) {
            return;
        }

        this.state.library.destroy();

        this.setState({
            library: undefined,
        });
    }

    public shouldComponentUpdate(nextProps: Readonly<IParticlesProps>): boolean {
        return !equal(nextProps, this.props);
    }

    public componentDidUpdate(): void {
        this.refresh();
    }

    public forceUpdate(): void {
        this.refresh();

        super.forceUpdate();
    }

    public componentDidMount(): void {
        if (this.props.init) {
            this.props.init(tsParticles);
        }

        this.loadParticles();
    }

    public componentWillUnmount(): void {
        this.destroy();
    }

    public render(): ComponentChild {
        const { width, height, className, canvasClassName, id } = this.props;

        return (
            <div className={className} id={id}>
                <canvas
                    className={canvasClassName}
                    style={{
                        ...this.props.style,
                        width,
                        height,
                    }}
                />
            </div>
        );
    }

    private refresh(): void {
        this.destroy();

        this.loadParticles();
    }

    private loadParticles(): void {
        const cb = (container?: Container) => {
            if (this.props.container) {
                (this.props.container as MutableRefObject<Container>).current = container;
            }

            this.setState({
                library: container,
            });

            if (this.props.loaded) {
                this.props.loaded(container);
            }
        };

        if (this.props.url) {
            tsParticles.loadJSON(this.props.id, this.props.url).then(cb);
        } else {
            tsParticles.load(this.props.id, this.props.params ?? this.props.options).then(cb);
        }
    }
}
