module.exports = {
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        "parser": "babel-eslint"
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        /* vue 2 配置 */
        // 'plugin:vue/recommended',
        'plugin:vue/essential',
        // 'plugin:vue/strongly-recommended',
        /* vue 3 配置 */
        // "plugin:vue/vue3-recommended"
        // "plugin:vue/vue3-essential"
        // "plugin:vue/vue3-strongly-recommended"
    ],
    plugins: ['vue'],
    rules: {
        "no-multiple-empty-lines":  ["warn", { "max": 1}],
        "global-require": 0,
        "spaced-comment": 1,//注释空格
        "no-trailing-spaces": 1,//一行结束后面不要有空格
        "arrow-spacing": 1,//=>的前/后括号
        "no-multi-spaces": 1,//不能用多余的空格
        "space-before-blocks": [1, "always"],//不以新行开始的块{前面要不要有空格
        "max-len": [1,120],
        "dot-notation": 1,
        "key-spacing": [1, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
        "space-infix-ops": [1],//一元运算符两边空格
        "comma-spacing": [1],//逗号后边空格
        "keyword-spacing": [1],// if else 空格
        "semi-spacing": [1, {"before": false, "after": true}],//分号前后空格
        // 官方已经有对应规则
        "no-underscore-dangle": [1],
        "no-console": "off",
        "consistent-return": 1,
        "camelcase": 0,
        "no-empty-function": 1,
        "no-use-before-define": "off",
        "complexity": "off",
        "no-lonely-if": "warn",
        "new-cap": "warn",
        'indent': ['warn', 4],
        'indent': ['warn', 4],
        'vue/html-indent': ['warn', 4],
        'vue/html-closing-bracket-newline': 'warn',
        'vue/max-attributes-per-line': [1, {
            singleline: 4,
            multiline: {
              max: 1,
              allowFirstLine: false
            }
          }],
          'vue/order-in-components': [1, {
            order: [
              'el',
              'name',
              'parent',
              'functional',
              ['delimiters', 'comments'],
              ['components', 'directives', 'filters'],
              'extends',
              'mixins',
              'inheritAttrs',
              'model',
              ['props', 'propsData'],
              'fetch',
              'asyncData',
              'data',
              'computed',
              'watch',
              'LIFECYCLE_HOOKS',
              'methods',
              ['template', 'render'],
              'renderError'
            ]
          }],
    },

};