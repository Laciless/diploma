const p1Input = document.forms["plasma"].elements["colorP1"]
const p2Input = document.forms["plasma"].elements["colorP2"]
const p3Input = document.forms["plasma"].elements["colorP3"]
const p4Input = document.forms["plasma"].elements["colorP4"]
const roughInput = document.forms["plasma"].elements["rough"]

let plasma = function()
{
	var width, height, canvas, ctx;
	
	this.TwoAv = function(c1,c2,rough)
	{
		roughness = rough/2-rough*Math.random();
		return {
			r: ~~((c1.r+c2.r)/2+roughness),
			g: ~~((c1.g+c2.g)/2+roughness),
			b: ~~((c1.b+c2.b)/2+roughness),
		}
	}
	
	this.FourAv = function(c1,c2,c3,c4, rough)
	{
		roughness = rough/2-rough*Math.random();
		return {
			r: ~~((c1.r+c2.r+c3.r+c4.r)/4+roughness),
			g: ~~((c1.g+c2.g+c3.g+c4.g)/4+roughness),
			b: ~~((c1.b+c2.b+c3.b+c4.b)/4+roughness),
		}
	}
	
	this.init = function(canvasOut, rough)
	{
		//initialize local variables
		width = canvasOut.width;
        height = canvasOut.height;
        canvas = canvasOut
        ctx = canvas.getContext("2d");

		//generate points
		this.points = this.getPoints(width, height, rough);
		
		//draw points
		this.draw();
	}
	
	this.draw = function()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var x = 0; x < width; x++)
		{
			for (var y = 0; y < height; y++)
			{
				//get color for each pixel
				var color = this.points[x][y];
				ctx.fillStyle = "rgb("+color.r+","+color.g+","+color.b+")";
				ctx.fillRect(x, y, 1, 1);
			}
		}
	}
	
	this.getPoints = function(width, height, rough) 
	{
		var points = [];
		
		for (var x = 0; x <= width; x++)
		{
			points[x] = [];
		}
		//give corners random colors	
		const p1 = hexToRgb(p1Input.value);	
		const p2 = hexToRgb(p2Input.value);	
		const p3 = hexToRgb(p3Input.value);	
		const p4 = hexToRgb(p4Input.value);	
		this.splitRect(points, 0, 0, width, height, p1, p2, p3, p4,rough);
		return points;
	}

	this.splitRect = function(points, x, y, width, height, p1, p2, p3, p4,rough)
	{  
		var side1, side2, side3, side4, center;
		var transWidth = ~~(width / 2);
		var transHeight = ~~(height / 2);
		
		//as long as square is bigger then a pixel..
		if (width > 1 || height > 1)
		{  
			
			//sides are averages of the connected corners
			//p1----p2
			//|     |
			//p4----p3
			
			
			points[transWidth][y]=side1= this.TwoAv(p1,p2,rough);			
			points[width][transHeight]=side2= this.TwoAv(p2,p3,rough);
			points[transWidth][height]=side3= this.TwoAv(p3,p4,rough);
			points[x][transHeight]=side4= this.TwoAv(p4,p1,rough);
			points[transWidth][transHeight]=center = this.FourAv(p1,p2,p3,p4,rough);
	
		
			//repear operation for each of 4 new squares created			
			this.splitRect(points, x, y, transWidth, transHeight, p1, side1, center, side4,rough);
			this.splitRect(points, x + transWidth, y, width - transWidth, transHeight, side1, p2, side2, center,rough);
			this.splitRect(points, x + transWidth, y + transHeight, width - transWidth, height - transHeight, center, side2, p3, side3,rough);
			this.splitRect(points, x, y + transHeight, transWidth, height - transHeight, side4, center, side3, p4,rough);
		}
		else 
		{
			//when last square is just a pixel, simply average it from the corners
			points[x][y]= this.FourAv(p1,p2,p3,p4,rough);
		}
	}	
			
	return this;
}


document.forms["plasma"].addEventListener('submit', (e) => {
	e.preventDefault();
    e.stopPropagation();
	
	const rough = parseInt(roughInput.value);
	const Plasma = new plasma();
    Plasma.init(fractalCanvas, rough)
    return false;
});
