module.exports = function() {

  fns = {
    name: "",
    empty: true,

    setName: function(room_name) {
      name = room_name;
    },
    getName: function() {
      return name;
    },
    setStatus: function(is_empty) {
      console.log(is_empty);
      if (is_empty) {
        console.log("about to check if empty");
        if (is_empty === "1") {
          this.empty = false;
        } else {
          this.empty = true;
        }
      }
    },
    getStatus: function() {
      return this.empty;
    },
    getStatusString: function() {
      if (this.empty) {
        return "empty";
      } else {
        return "occupied";
      }
    }
  }

  return fns;


}
