img="";
status="";
objects=[];

function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="-_-";    
}

function preload()
{
img=loadImage("dog_cat.jpg");
alarm=new Audio("Voicy_skibidi_toilet.mp3");
}

function draw()
{
    image(video,0,0,380,380);
    if(status!="")
    {
        for(i=0;i<objects.length;i++)
        {
            r=random(255);
            g=random(255);
            b=random(255);
            document.getElementById("status").innerHTML="LOL YOU GOTS NEGATIVE RIZZ";
            document.getElementById("number_of_objects").innerHTML="There are " + objects.length + " SKIBIDI TOILETS";
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);   
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[0].label!='person')
            {
                alarm.play();
                document.getElementById("number_of_objects").innerHTML="NOOOO DA SKIBIDI TOILET HAS EATEN THE BABY";
            }
            else
            {
                document.getElementById("number_of_objects").innerHTML="We have saved the baby";
            }
        }
    }
}

function modelLoaded()
{
    console.log("Modal is lodad");
    status=true;
    objectDetector.detect(video,gotResults);
}

function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects=results;
}