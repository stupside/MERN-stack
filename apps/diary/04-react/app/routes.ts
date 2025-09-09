import { layout, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/", "routes/tasks.tsx"),
    route("/:id", "routes/task.tsx"),
  ]),
] satisfies RouteConfig;
