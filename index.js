module.exports = {
    name: 'core.plugin.bindings',
    dependencies: [
        'core.import.react',
        'core.import.prop-types',
        'core.import.create-react-class'
    ],
    init(definition, done) {

        var core = this;

        function isSimilar(a, b){
            var typeA = core.typeOf(a);
            var typeB = core.typeOf(b);
            if(typeA !== typeB){ return false; }
            if(typeA === 'array'){
                if(a.length !== b.length){ return false; }
                for(var i = 0; i < a.length; i++){
                    if(!isSimilar(a[i], b[i])){ return false; }
                }
                return true;
            }
            if(typeA === 'object'){
                for(var m in a){
                    if(!isSimilar(a[m], b[m])){ return false; }
                }
                return true;
            }
            return a === b;
        }

        var { createReactClass, PropTypes, React } = core.imports;

        var Bindings = createReactClass({
            propTypes: {
                bindings: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
                render: PropTypes.func,
                tree: PropTypes.object.isRequired
            },
            getInitialState() {
                var bindings = this.props.bindings;
                if (!bindings) return null;
                if (typeof bindings === 'string') {
                    bindings = [bindings];
                }
                return this.watch(bindings);
            },
            componentWillReceiveProps(newProps){
                if(newProps.bindings !== this.props.bindings){
                    if(!isSimilar(newProps.bindings, this.props.bindings)){
                        this.setState(this.watch(newProps.bindings));  
                    }
                }
            },
            watch(bindings) {
                this.isSingle = false;
                if (Array.isArray(bindings)) {
                    this.isSingle = true;
                    bindings = {
                        item: bindings
                    }
                }
                if (this.watcher) {
                    this.watcher.off('update', this.updateBindings);
                }
                var watcher = this.watcher = this.props.tree.watch(bindings);
                watcher.on('update', this.updateBindings);
                return watcher.get();
            },
            updateBindings() {
                if (this.watcher) {
                    this.setState(this.watcher.get());
                }
            },
            componentWillUnmount() {
                if (this.watcher) {
                    this.watcher.off('update', this.updateBindings);
                }
            },
            render() {
                var data = this.isSingle ? this.state.item : this.state;
                var render = this.props.render || this.props.children;
                var rendered = render(data);
                return rendered || null;
            }
        });

        core.extend({
            bind(bindings, render) {
                var props = {
                    bindings: bindings,
                    render: render,
                    tree: this.tree
                };
                return React.createElement(Bindings, props);
            },
            Bindings: Bindings,
        });

        done('√');
    }

};