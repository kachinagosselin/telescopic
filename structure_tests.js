// Generated by CoffeeScript 1.6.3
test('find clicks remaining on unclickable link', function() {
  var name_vertex;
  telescopicText.reset();
  name_vertex = new telescopicText.Vertex('myName', 'myContent', null, null, null, null, null);
  equal(name_vertex.click_count, void 0);
  return equal(name_vertex.findClicksRemaining(), 0);
});

test('forward click a node, vertex_A. Test vertex_A visibility and clicks remaining', function() {
  var graph1, vertex_A;
  telescopicText.reset();
  graph1 = makeTestVerticies();
  vertex_A = graph1.getNode('A');
  equal(vertex_A.findClicksRemaining(), 1);
  vertex_A.forwardClick();
  equal(vertex_A.findClicksRemaining(), 0);
  return equal(vertex_A.shouldBeVisible(), false);
});

test('make sure hidden nodes give correct visibility.', function() {
  var graph1, vertex_C, vertex_K;
  telescopicText.reset();
  graph1 = makeTestVerticies();
  vertex_C = graph1.getNode('C');
  vertex_K = graph1.getNode('K');
  equal(vertex_C.shouldBeVisible(), false);
  return equal(vertex_K.shouldBeVisible(), false);
});

test('determine and record incoming tree, cross, and back edges', function() {
  var graph1, vertex_A, vertex_B, vertex_C;
  telescopicText.reset();
  graph1 = makeTestVerticies();
  vertex_A = graph1.getNode('A');
  vertex_B = graph1.getNode('B');
  vertex_C = graph1.getNode('C');
  /* tree edges*/

  vertex_B.determineAndSetIncomingEdge(vertex_A);
  equal(vertex_B.incoming_tree, vertex_A);
  equal(vertex_B.incoming_forward, false);
  equal(vertex_B.incoming_back, false);
  equal(vertex_B.incoming_cross, false);
  vertex_C.determineAndSetIncomingEdge(vertex_A);
  equal(vertex_C.incoming_tree, vertex_A);
  equal(vertex_C.incoming_forward, false);
  equal(vertex_C.incoming_back, false);
  equal(vertex_C.incoming_cross, false);
  /* cross edge*/

  vertex_C.determineAndSetIncomingEdge(vertex_B);
  equal(vertex_C.incoming_tree, vertex_A);
  equal(vertex_C.incoming_cross[0], vertex_B);
  equal(vertex_C.incoming_back[0], void 0);
  equal(vertex_C.incoming_forward[0], void 0);
  /* back edge*/

  vertex_A.determineAndSetIncomingEdge(vertex_C);
  equal(vertex_A.incoming_back[0], vertex_C);
  equal(vertex_A.incoming_tree[0], void 0);
  equal(vertex_A.incoming_forward[0], void 0);
  return equal(vertex_A.incoming_tree, false);
});

test('determine and record forward edges', function() {
  var graph1, vertex_D, vertex_E, vertex_J, vertex_Q;
  telescopicText.reset();
  graph1 = makeTestVerticies();
  vertex_D = graph1.getNode('D');
  vertex_E = graph1.getNode('E');
  vertex_J = graph1.getNode('J');
  vertex_Q = graph1.getNode('Q');
  vertex_Q.incoming_tree = vertex_J;
  vertex_J.incoming_tree = vertex_E;
  vertex_E.incoming_tree = vertex_D;
  vertex_Q.determineAndSetIncomingEdge(vertex_E);
  equal(vertex_Q.incoming_tree, vertex_J);
  equal(vertex_Q.incoming_back.length, 0);
  equal(vertex_Q.incoming_cross.length, 0);
  return equal(vertex_Q.incoming_forward[0], vertex_E);
});
