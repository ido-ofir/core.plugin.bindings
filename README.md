# core.plugin.bindings

component bindings for `core.tree`.


### installing

plugin depends on:
<div>
  <a href="https://github.com/ido-ofir/core.import.baobab">core.import.baobab</a>
</div>
<div>
  <a href="https://github.com/ido-ofir/core.import.create-react-class">core.import.create-react-class</a>
</div>
<div>
  <a href="https://github.com/ido-ofir/core.import.prop-types">core.import.prop-types</a>
</div>
<div>
  <a href="https://github.com/ido-ofir/core.import.react">core.import.react</a>
</div>
<div>
  <a href="https://github.com/ido-ofir/core.plugin.tree">core.plugin.tree</a>
</div>
```
npm i core.plugin.bindings
```

### loading
```js
let Core = require('core.constructor');

let core = new Core();

core.plugin([
  require('core.import.create-react-class'),
  require('core.import.prop-types'),
  require('core.import.react'),
  require('core.plugin.tree'),
  require('core.plugin.bindings')
]);
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
