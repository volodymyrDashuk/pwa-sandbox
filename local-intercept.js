/* eslint-disable */
/**
 * Custom interceptors for the project.
 *
 * This project has a section in its package.json:
 *    "pwa-studio": {
 *        "targets": {
 *            "intercept": "./local-intercept.js"
 *        }
 *    }
 *
 * This instructs Buildpack to invoke this file during the intercept phase,
 * as the very last intercept to run.
 *
 * A project can intercept targets from any of its dependencies. In a project
 * with many customizations, this function would tap those targets and add
 * or modify functionality from its dependencies.
 */

const { Targetables } = require('@magento/pwa-buildpack')

module.exports = targets => {
    const targetables = Targetables.using(targets);

    const MainComponent = targetables.reactComponent(
        '@magento/venia-ui/lib/components/Main/main.js'
    );

    const CmsBlock = MainComponent.addImport(
        "CmsBlock from '@magento/venia-ui/lib/components/CmsBlock'"
    );

    MainComponent.insertBeforeJSX(
    '<Footer/>',
    `<${CmsBlock} identifiers="my-identifiers" />`
    );
}
