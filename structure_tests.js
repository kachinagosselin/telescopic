// Generated by CoffeeScript 1.6.3
test('forward click a node, vertex_A. test vertex_A visibility', function() {
  var graph1, vertex_A;
  telescopicText.reset();
  graph1 = makeTestVerticies();
  vertex_A = graph1.getNode('A');
  vertex_A.forward_click();
  equal(vertex_A.findClicksRemaining(), 0);
  return equal(vertex_A.shouldBeVisible(), false);
});

test('forward click a node, vertex_A. Test its children\'s visibility', function() {
  var graph1, vertex_A, vertex_B, vertex_C;
  telescopicText.reset();
  graph1 = makeTestVerticies();
  vertex_A = graph1.getNode('A');
  vertex_B = graph1.getNode('B');
  vertex_C = graph1.getNode('C');
  vertex_A.forward_click();
  equal(vertex_B.incoming_tree, vertex_A);
  equal(vertex_B.findClicksRemaining, 1);
  equal(vertex_B.shouldBeVisible(), true);
  equal(vertex_C.incoming_tree, vertex_A);
  equal(vertex_C.findClicksRemaining, 2);
  return equal(vertex_C.shouldBeVisible(), true);
});
