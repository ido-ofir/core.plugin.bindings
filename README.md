# core.plugin.bindings

component bindings for `core.tree`.


### installing
```
npm i core.plugin.bindings
```

### loading
```js
let Core = require('core.constructor');

let core = new Core();

core.plugin(
  require('core.plugin.bindings')
);
```


### usage
```jsx
{
    // in some component
    render(){
        return (
            <div>
                { 
                    core.bind('a', a => 
                      <div>      { /* this renders anytime 'a' changes */ }
                          { a }
                      </div>
                    )
                }
            </div>
        );
    }
}
```
