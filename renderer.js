// Generated by CoffeeScript 1.6.3
var telescopicText;

telescopicText = {};

telescopicText.graphs = {};

telescopicText.reset = function() {
  telescopicText.graphs = {};
  return new telescopicText.Graph('telescopicDefaultID');
};

telescopicText.Graph = (function() {
  function Graph(_name) {
    /* shortcut to reference graphs*/

    var _nodes;
    telescopicText.graphs[_name] = this;
    /* private*/

    _nodes = {};
    /*getters, setters*/

    this.getName = function() {
      return _name;
    };
    this.getNode = function(key) {
      var node;
      node = _nodes[key];
      if (node === void 0) {
        console.log('Graph "' + this.getName() + '" is missing a child, with key "' + key + '."');
        null;
      }
      return node;
    };
    this.setNode = function(key, value) {
      return _nodes[key] = value;
    };
    /* object-level methods*/

    this.returnVertexFromKeyOrObject = function(key_or_object) {
      if (!(key_or_object instanceof telescopicText.Vertex)) {
        return key_or_object = this.getNode(key_or_object);
      } else {
        return key_or_object;
      }
    };
    this.makeLinkedList = function(start_vertex) {
      var current_vertex, next_vertex, _results;
      start_vertex = this.returnVertexFromKeyOrObject(start_vertex);
      current_vertex = start_vertex;
      next_vertex = this.returnVertexFromKeyOrObject(current_vertex.getNext());
      if (!start_vertex.getNext()) {
        console.log('Careful! This graph only has one vertex linked.');
        +'and that seems pretty silly to me.';
      }
      _results = [];
      while (next_vertex) {
        if (next_vertex === start_vertex) {
          current_vertex.setNext(null);
          next_vertex.setPrevious(null);
          console.log("Your linked list is cyclical when it should be linear. " + "Did not link the start and end nodes.");
          _results.push(next_vertex = false);
        } else {
          this.constructor.link(current_vertex, next_vertex);
          current_vertex = next_vertex;
          _results.push(next_vertex = this.returnVertexFromKeyOrObject(current_vertex.getNext()));
        }
      }
      return _results;
    };
    this.setReferencesForChildrenThroughoutGraph = function() {
      var key, value, _results;
      _results = [];
      for (key in _nodes) {
        value = _nodes[key];
        _results.push(value.setChildrenReferences());
      }
      return _results;
    };
  }

  /* class method*/


  Graph.link = function(from_vertex, to_vertex) {
    from_vertex.setNext(to_vertex);
    return to_vertex.setPrevious(from_vertex);
  };

  Graph.dangerousUnlink = function(vertex) {
    var next, previous;
    next = vertex.getNext();
    previous = vertex.getPrevious();
    vertex.setNext(null);
    vertex.setPrevious(null);
    if (next) {
      next.setPrevious(null);
    }
    if (previous) {
      return previous.setNext(null);
    }
  };

  Graph.safeUnlink = function(vertex) {
    var next, previous;
    next = vertex.getNext();
    previous = vertex.getPrevious();
    vertex.setNext(null);
    vertex.setPrevious(null);
    if (next) {
      next.setPrevious(previous);
    }
    if (previous) {
      return previous.setNext(next);
    }
  };

  return Graph;

})();

telescopicText.Vertex = (function() {
  function Vertex(_name, content, children, _remain_after_click, _next, _graph, _starter) {
    var _click_count, _previous;
    this.content = content;
    this.children = children != null ? children : [];
    if (_remain_after_click == null) {
      _remain_after_click = false;
    }
    if (_next == null) {
      _next = null;
    }
    if (_graph == null) {
      _graph = "telescopicDefaultID";
    }
    if (_starter == null) {
      _starter = false;
    }
    if (!telescopicText.graphs[_graph]) {
      new telescopicText.Graph(_graph);
    }
    _graph = telescopicText.graphs[_graph];
    _graph.setNode(_name, this);
    this.incoming_tree = false;
    this.incoming_forward = [];
    this.incoming_back = [];
    this.incoming_cross = [];
    /* private variables*/

    _previous = null;
    _click_count = 0;
    /* getters, setters*/

    this.getStarter = function() {
      return _starter;
    };
    this.getName = function() {
      return _name;
    };
    this.getGraph = function() {
      return _graph;
    };
    this.getNext = function() {
      return _next;
    };
    this.setNext = function(newNext) {
      return _next = newNext;
    };
    this.getPrevious = function() {
      return _previous;
    };
    this.setPrevious = function(newPrevious) {
      return _previous = newPrevious;
    };
    /* meta information*/

    this.getClickCount = function() {
      return _click_count;
    };
    this.getRemainAfterClick = function() {
      return _remain_after_click;
    };
    this.findClicksRemaining = function() {
      /* doesn't take _remain_after_click into account, because
      				that wouldn't count as a click
      */

      return this.children.length - _click_count;
    };
    this.findIndexOfChildInChildren = function(child_vertex) {
      var child, child_index, row, _i, _j, _len, _len1;
      child_index = 0;
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        row = children[_i];
        for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
          child = row[_j];
          if (child === child_vertex) {
            return child_index;
          }
        }
        child_index += 1;
      }
      return false;
    };
    /* visibility information*/

    this.shouldBeVisible = function() {
      /* starter case*/

      if (this.children.length === 0) {
        return true;
      } else if (this.getStarter() && this.findClicksRemaining() > 0) {
        return true;
      } else if (this.getStarter() && this.getRemainAfterClick()) {
        return true;
        /* not a starter node*/

      } else if (this.findClicksRemaining() > 0 && this.incoming_tree) {
        return true;
      } else if (this.incoming_tree && this.getRemainAfterClick()) {
        return true;
      } else {
        return false;
      }
    };
    this.shouldBeReverseClickable = function() {
      /* need to check to make sure that parent is on the same click index as the child*/

      if (_click_count === 0 && this.shouldBeVisible() && this.incoming_tree && _click_count === 0 && this.incoming_tree.findIndexOfChildInChildren(this) === this.incoming_tree.getClickCount() - 1) {
        return true;
      } else {
        return false;
      }
    };
    this.forwardDetermineAndSetIncomingEdge = function(incoming_vertex) {
      /* assumes that incoming_vertex is valid*/

      if (!this.incoming_tree && !this.getStarter()) {
        return this.incoming_tree = incoming_vertex;
      } else if (this.determineIfBackEdge(incoming_vertex)) {
        return this.incoming_back.push(incoming_vertex);
      } else if (this.determineIfForwardEdge(incoming_vertex)) {
        return this.incoming_forward.push(incoming_vertex);
      } else {
        return this.incoming_cross.push(incoming_vertex);
      }
    };
    this.determineIfBackEdge = function(incoming_vertex) {
      var parent_vertex;
      parent_vertex = incoming_vertex.incoming_tree;
      while (parent_vertex) {
        if (parent_vertex === this) {
          return true;
        } else {
          parent_vertex = parent_vertex.incoming_tree;
        }
      }
      return false;
    };
    this.determineIfForwardEdge = function(incoming_vertex) {
      var parent_vertex;
      parent_vertex = this.incoming_tree;
      while (parent_vertex) {
        if (parent_vertex === incoming_vertex) {
          return true;
        } else {
          parent_vertex = parent_vertex.incoming_tree;
        }
      }
      return false;
    };
    /* clicking*/

    this.forwardClick = function() {
      /* catch instance in which it shouldn't be clicked*/

      var child, relevant_children, _i, _len;
      if (this.findClicksRemaining() <= 0 || !this.shouldBeVisible()) {
        return this;
      }
      relevant_children = this.children[_click_count];
      for (_i = 0, _len = relevant_children.length; _i < _len; _i++) {
        child = relevant_children[_i];
        child.receiveForwardClick(this);
      }
      _click_count += 1;
      return this;
    };
    this.receiveForwardClick = function(incoming_vertex) {
      this.forwardDetermineAndSetIncomingEdge(incoming_vertex);
      return this;
    };
    this.setChildrenReferences = function() {
      var child, child_index, child_key, set_index, _results;
      set_index = 0;
      _results = [];
      while (set_index < this.children.length) {
        child_index = 0;
        while (child_index < this.children[set_index].length) {
          child_key = this.children[set_index][child_index];
          child = _graph.returnVertexFromKeyOrObject(child_key);
          if (!(child instanceof telescopicText.Vertex)) {
            console.log('The key, "' + child_key + '", will be removed from vertex\'s child array.');
            this.children[set_index].splice(child_index, 1);
          } else {
            this.children[set_index][child_index] = child;
            child_index += 1;
          }
        }
        _results.push(set_index += 1);
      }
      return _results;
    };
  }

  return Vertex;

})();

telescopicText.reset();
