import Matter from "matter-js";

export const Physics = (entities: any, { time }: any) => {
    let engine = entities.physics.engine;
    Matter.Engine.update(engine, time.delta);
    return entities;
};

export const PlayerControl = (entities: any, { touches, screen }: any) => {
    let player = entities.player.body;

    touches.filter((t: any) => t.type === "move").forEach((t: any) => {
        if (t.event.pageX < screen.width / 2) {
            Matter.Body.applyForce(player, player.position, { x: -0.005, y: 0 });
        } else {
            Matter.Body.applyForce(player, player.position, { x: 0.005, y: 0 });
        }
    });

    // Simple jump on press
    touches.filter((t: any) => t.type === "press").forEach((t: any) => {
        Matter.Body.applyForce(player, player.position, { x: 0, y: -0.02 });
    });

    return entities;
};
