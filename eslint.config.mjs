import eslint from '@jiangweiye/eslint-config';

export default eslint({
    typescript: true,
    rules: {
        'style/indent-binary-ops': 'off'
    },
    ignores: ['dist', 'node_modules']
});
