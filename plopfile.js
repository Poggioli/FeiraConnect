export default function (plop) {
  plop.setGenerator('Component', {
    description: 'This is will generate a new Component',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'Component name'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase componentName}}/index.tsx',
        templateFile: 'plop-templates/components/index.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase componentName}}/use{{pascalCase componentName}}.ts',
        templateFile: 'plop-templates/components/useHook.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase componentName}}/types.ts',
        templateFile: 'plop-templates/components/types.hbs'
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase componentName}}/{{pascalCase componentName}}.tsx',
        templateFile: 'plop-templates/components/component.hbs'
      },
    ]
  });
}