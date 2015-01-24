var StarshipStore = require("<scripts>/stores/StarshipStore")
var StarshipModule = require("<scripts>/components/StarshipModule")

var Starship = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}
                 className={this.renderClasses()}>
                 {this.renderModules()}
            </div>
        )
    },
    renderStyles: function() {
        var player = StarshipStore.getPlayerData()
        if(this.props.data.key == player.key) {
            return {
                top: "0px",
                left: "0px",
                right: "0px",
                bottom: "0px",
                margin: "auto"
            }
        } else {
            return {
                left: this.props.data.position.x - player.position.x + (MAX_WIDTH / 2) - 0.5 + "em",
                top: this.props.data.position.y - player.position.y + (MAX_HEIGHT / 2) - 0.5 + "em"
            }
        }
    },
    renderClasses: function() {
        return React.addons.classSet({
            starship: true
        })
    },
    renderModules: function() {
        var renderings = []
        for(var index = 0; index < this.props.data.modules.length; index++) {
            var data = this.props.data.modules[index]
            renderings.push(<StarshipModule key={index} data={data}/>) 
        }
        return renderings
    }
})

module.exports = Starship
