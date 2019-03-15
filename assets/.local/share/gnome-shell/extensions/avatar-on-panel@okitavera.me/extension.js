const St = imports.gi.St;
const Main = imports.ui.main;
const userData = imports.gi.AccountsService.UserManager.get_default().get_user(
  imports.gi.GLib.get_user_name()
);

let icon = null;
let wrapper = null;

var updateAva = () => {
  if (userData.get_icon_file() != null) {
    icon.style = `background-image: url("${userData.get_icon_file()}");`;
    icon.width = icon.height = Main.panel.actor.get_height() - 8;
  }
};

var enable = () => {
  icon = new St.Bin({ style_class: "avatar-indicator" });
  userData.connect("notify::is-loaded", updateAva.bind(this));
  userData.connect("changed", updateAva.bind(this));
  wrapper = new St.Bin({ style_class: "avatar-indicator--wrapper" });
  wrapper.add_actor(icon);
  Main.panel.statusArea.aggregateMenu._power.indicators.add_child(wrapper);
  updateAva();
}

var disable = () => {
  Main.panel.statusArea.aggregateMenu._power.indicators.remove_child(wrapper);
  wrapper = null;
};
