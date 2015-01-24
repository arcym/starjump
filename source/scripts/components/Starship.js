var StarshipStore = require("<scripts>/stores/StarshipStore")

var Starship = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyles()}
                 className={this.renderClasses()}/>
        )
    },
    renderStyles: function() {
        var my_data = StarshipStore.getMyData()
        if(this.props.data.id == my_data.id) {
            return {
                top: "0px",
                left: "0px",
                right: "0px",
                bottom: "0px",
                margin: "auto"
            }
        } else {
            return {
                left: (my_data.position.x * -1) - this.props.data.position.x + (MAX_WIDTH / 2) - 0.5 + "em",
                top: (my_data.position.y * -1) - this.props.data.position.y + (MAX_HEIGHT / 2) - 0.5 + "em"
            }
        }
    },
    renderClasses: function() {
        return React.addons.classSet({
            starship: true
        })
    }
})

module.exports = Starship