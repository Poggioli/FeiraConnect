export default function (plop) {
  plop.setGenerator("Component", {
    description: "This is will generate a new Component",
    prompts: [
      {
        type: "input",
        name: "componentName",
        message: "Component name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase componentName}}/index.ts",
        templateFile: "plop-templates/components/index.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase componentName}}/use{{pascalCase componentName}}.ts",
        templateFile: "plop-templates/components/useHook.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase componentName}}/types.ts",
        templateFile: "plop-templates/components/types.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase componentName}}/{{pascalCase componentName}}.tsx",
        templateFile: "plop-templates/components/component.hbs",
      },
    ],
  });
  plop.setGenerator("Service", {
    description: "This is will generate a new Service",
    prompts: [
      {
        type: "input",
        name: "serviceName",
        message: "Service name",
      },
      {
        type: "list",
        name: "httpVerb",
        message: "Select http verb of your service",
        choices: ["GET", "POST", "PUT", "DELETE"],
        default: "GET",
      },
      {
        when(context) {
          return context.httpVerb === "GET";
        },
        type: "confirm",
        name: "isPaginated",
        message: "Your service will be paginated?",
        default: "Yes",
      },
    ],
    actions: function (data) {
      var actions = [];

      if (data.httpVerb === "GET" && data.isPaginated) {
        actions.push(
          {
            type: "add",
            path: "src/services/{{camelCase serviceName}}/index.ts",
            templateFile: "plop-templates/services/get/paginated/index.hbs",
          },
          {
            type: "add",
            path: "src/services/{{camelCase serviceName}}/types.ts",
            templateFile: "plop-templates/services/get/paginated/types.hbs",
          },
          {
            type: "add",
            path: "src/services/{{camelCase serviceName}}/{{camelCase serviceName}}.ts",
            templateFile: "plop-templates/services/get/paginated/service.hbs",
          },
        );
      }

      if (data.httpVerb === "GET" && !data.isPaginated) {
        actions.push(
          {
            type: "add",
            path: "src/services/{{camelCase serviceName}}/index.ts",
            templateFile: "plop-templates/services/get/index.hbs",
          },
          {
            type: "add",
            path: "src/services/{{camelCase serviceName}}/types.ts",
            templateFile: "plop-templates/services/get/types.hbs",
          },
          {
            type: "add",
            path: "src/services/{{camelCase serviceName}}/{{camelCase serviceName}}.ts",
            templateFile: "plop-templates/services/get/service.hbs",
          },
        );
      }

      if (data.httpVerb === "POST") {
        actions.push(
          {
            type: "add",
            path: "src/services/{{camelCase serviceName}}/index.ts",
            templateFile: "plop-templates/services/post/index.hbs",
          },
          {
            type: "add",
            path: "src/services/{{camelCase serviceName}}/types.ts",
            templateFile: "plop-templates/services/post/types.hbs",
          },
          {
            type: "add",
            path: "src/services/{{camelCase serviceName}}/{{camelCase serviceName}}.ts",
            templateFile: "plop-templates/services/post/service.hbs",
          },
        );
      }

      if (data.httpVerb === "PUT") {
        actions.push(
          {
            type: "add",
            path: "src/services/{{camelCase serviceName}}/index.ts",
            templateFile: "plop-templates/services/put/index.hbs",
          },
          {
            type: "add",
            path: "src/services/{{camelCase serviceName}}/types.ts",
            templateFile: "plop-templates/services/put/types.hbs",
          },
          {
            type: "add",
            path: "src/services/{{camelCase serviceName}}/{{camelCase serviceName}}.ts",
            templateFile: "plop-templates/services/put/service.hbs",
          },
        );
      }

      if (data.httpVerb === "DELETE") {
        actions.push(
          {
            type: "add",
            path: "src/services/{{camelCase serviceName}}/index.ts",
            templateFile: "plop-templates/services/delete/index.hbs",
          },
          {
            type: "add",
            path: "src/services/{{camelCase serviceName}}/types.ts",
            templateFile: "plop-templates/services/delete/types.hbs",
          },
          {
            type: "add",
            path: "src/services/{{camelCase serviceName}}/{{camelCase serviceName}}.ts",
            templateFile: "plop-templates/services/delete/service.hbs",
          },
        );
      }

      return actions;
    },
  });
}
