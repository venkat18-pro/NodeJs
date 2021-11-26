const async_hook = require('async_hooks');

function destroy(id) {
    print({ stage: 'destroy', id})
}

const hook = async_hook.createHook(
    { init, before, after, destroy}
);