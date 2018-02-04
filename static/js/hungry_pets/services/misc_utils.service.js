app.service('MiscUtils', function() {
  var self = this;

  this.undefined_or_null = function(thingy) {
    /** Return true if 'thingy' is undefined or null
    * See this S.O. question: http://stackoverflow.com/a/17911898/289011
    */
    return angular.isUndefined(thingy) || thingy === null;
  };

  this.extract_uniques = function(array_of_objs, field) {
    var retval = new Array();
    field = self.undefined_or_null(field) ? 'name' : field;
    array_of_objs.forEach(function(item){
      if (retval.indexOf(item[field]) < 0) {
        retval.push(item[field]);
      }
    });
    return retval;
  };


  this.toggle_value = function(array, value) {
    if (array.indexOf(value) < 0) {
      array.push(value);
    } else {
      while (array.indexOf(value) >= 0) {
        array.splice(array.indexOf(value), 1);
      }
    }
  };
});