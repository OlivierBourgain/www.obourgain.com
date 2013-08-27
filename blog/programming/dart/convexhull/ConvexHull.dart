import 'dart:html';
import 'dart:math';

const NBPOINTS = 50;
const WIDTH = 800;
const HEIGHT = 400;
const MARGIN = 25;

class Point {
  Point(this.x, this.y);
  num x, y;
}

/**
 * Returns twice the area of the a given triangle.
 * The area is :
 *    > 0 if the points are in anticlockwise order 
 *    = 0 if the points are colinear 
 *    < 0 if the points are in clockwise order. 
 */
doubleArea(Point p0, Point p1, Point p2) {
  return p0.x * (p1.y - p2.y) - p1.x * (p0.y - p2.y) + p2.x * (p0.y - p1.y);
}

class Polygon {
  
  Polygon() {
    Random r = new Random();
    for(var i = 0; i < NBPOINTS; i++) {
      var x = r.nextInt(WIDTH - 2*MARGIN) + MARGIN;
      var y = r.nextInt(HEIGHT - 2*MARGIN) + MARGIN;
      Point p = new Point(x,y);
      addPoint(p);
    }
  }
  
  // Points defining the polygon
  var points = new List<Point>();
  // List of points on the hull of the polygon
  var hull = new List<Point>();

  var indexminY = -1;
  var minY = 2147483647; // Integer.MAX_VALUE

  addPoint(Point p) {
    points.add(p);
  }
  
  getPoints() {
    return points;
  }
  
  List<Point> computeHull() {
    // Check if already done.
    if (hull.length > 0) return hull;
    
    // Put the point with minY in the first position.
    // This will be the starting point of the hull
    points.sort( (p1, p2) => p1.y - p2.y);
    Point origin = points[0];
    Point cur = origin;
    hull.add(cur);

    Point candidate = points[0];

    while (true) {
      int idx = hull.length <=2  ? 1 : 0;
      for (int i = idx; i < points.length; i++) {
        Point p = points[i];
        int a = doubleArea(cur, candidate, p);
        if (a <= 0) {
          idx = i;
          candidate = p;
        }
      }
      if (candidate.x == origin.x && candidate.y == origin.y) break;
      hull.add(candidate);
      points.removeAt(idx);
      cur = candidate;
    }

    return hull;
  }

}

void main() {
  CanvasElement canvas = query("#canvas");
  var context = canvas.context2d;
  
  Polygon poly = new Polygon();
  drawPoly(context, poly);
  
  query("#new").on.click.add((e) {
    poly = new Polygon();
    drawPoly(context, poly);
  });
  
  query("#start").on.click.add((e) {
    List<Point> hull = poly.computeHull();
    drawHull(context, hull);
  });
}


void drawPoly(CanvasRenderingContext2D context, Polygon poly) {
  context.beginPath();
  context.clearRect(0,0,WIDTH,HEIGHT);
  context.closePath();
  for(Point p in poly.getPoints()) {
    drawPoint(context, p.x, p.y);        
  }
}

void drawHull(CanvasRenderingContext2D context, List<Point> list) {
  context.beginPath();
  context.lineWidth = 2;
  context.strokeStyle = BLUE;
  context.moveTo(list[0].x, list[0].y);
  for(Point p in list) {
    context.lineTo(p.x, p.y);
  }
  context.lineTo(list[0].x, list[0].y);
  context.closePath();
  context.stroke();  
}


const SEED_RADIUS = 2;
const TAU = PI * 2;
const ORANGE = "orange";
const BLUE = "blue";

/**
 * Draw a small circle representing a seed centered at (x,y).
 */
void drawPoint(CanvasRenderingContext2D context, num x, num y) {
  context.beginPath();
  context.lineWidth = 2;
  context.fillStyle = ORANGE;
  context.strokeStyle = ORANGE;
  context.arc(x, y, SEED_RADIUS, 0, TAU, false);
  context.fill();
  context.closePath();
  context.stroke();
}

