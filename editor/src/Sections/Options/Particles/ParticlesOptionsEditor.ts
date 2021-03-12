import type { EditorGroup } from "object-gui";
import type { IParticles } from "tsparticles-engine/Options/Interfaces/Particles/IParticles";
import type { Container } from "tsparticles-engine";
import { LinksOptionsEditor } from "./Links/LinksOptionsEditor";
import { OpacityOptionsEditor } from "./Opacity/OpacityOptionsEditor";
import { ColorOptionsEditor } from "./Color/ColorOptionsEditor";
import { NumberOptionsEditor } from "./Number/NumberOptionsEditor";
import { SizeOptionsEditor } from "./Size/SizeOptionsEditor";
import { RotateOptionsEditor } from "./Rotate/RotateOptionsEditor";
import { ShapeOptionsEditor } from "./Shape/ShapeOptionsEditor";
import { MoveOptionsEditor } from "./Move/MoveOptionsEditor";
import { CollisionsOptionsEditor } from "./Collisions/CollisionsOptionsEditor";
import { StrokeOptionsEditor } from "./Stroke/StrokeOptionsEditor";
import { ShadowOptionsEditor } from "./Shadow/ShadowOptionsEditor";
import { TwinkleOptionsEditor } from "./Twinkle/TwinkleOptionsEditor";
import { EditorBase } from "../../../EditorBase";
import { LifeOptionsEditor } from "./Life/LifeOptionsEditor";
import { BounceOptionsEditor } from "./Bounce/BounceOptionsEditor";
import { EditorType } from "object-gui";
import { DestroyOptionsEditor } from "./Destroy/DestroyOptionsEditor";
import { OrbitOptionsEditor } from "./Orbit/OrbitOptionsEditor";
import { RepulseOptionsEditor } from "./Repulse/RepulseOptionsEditor";
import { ZIndexOptionsEditor } from "./ZIndex/ZIndexOptionsEditor";

export class ParticlesOptionsEditor extends EditorBase {
    public group!: EditorGroup;
    private options!: IParticles;

    constructor(particles: Container) {
        super(particles);
    }

    public addToGroup(parent: EditorGroup, customName?: string, parentData?: unknown): void {
        this.group = parent.addGroup(customName ?? "particles", "Particles", true, parentData);
        this.options = this.group.data as IParticles;

        this.addBounce();
        this.addCollisions();
        this.addColor();
        this.addDestroy();
        this.addGroups();
        this.addLife();
        this.addLinks();
        this.addMove();
        this.addNumber();
        this.addOpacity();
        this.addOrbit();
        this.addRepulse();
        this.addRotate();
        this.addShadow();
        this.addShape();
        this.addSize();
        this.addStroke();
        this.addTwinkle();
        this.addZIndex();
        this.addProperties();
    }

    private addBounce(): void {
        const options = new BounceOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addCollisions(): void {
        const options = new CollisionsOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addColor(): void {
        const options = new ColorOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addDestroy(): void {
        const options = new DestroyOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addGroups(): void {
        // TODO: manage groups
    }

    private addLife(): void {
        const options = new LifeOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addLinks(): void {
        const options = new LinksOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addMove(): void {
        const options = new MoveOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addNumber(): void {
        const options = new NumberOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addOpacity(): void {
        const options = new OpacityOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addOrbit(): void {
        const options = new OrbitOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addRepulse(): void {
        const options = new RepulseOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addRotate(): void {
        const options = new RotateOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addShadow(): void {
        const options = new ShadowOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addShape(): void {
        const options = new ShapeOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addSize(): void {
        const options = new SizeOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addStroke(): void {
        const options = new StrokeOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addTwinkle(): void {
        const options = new TwinkleOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addZIndex(): void {
        const options = new ZIndexOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addProperties(): void {
        const particles = this.particles;

        this.group.addProperty("reduceDuplicates", "Reduce Duplicates", EditorType.boolean).change(async () => {
            await particles.refresh();
        });
    }
}
