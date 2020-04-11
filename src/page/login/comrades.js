
// Sample code to perform I/O:

process.stdin.resume();
process.stdin.setEncoding("utf-8");
var stdin_input = "";

process.stdin.on("data", function (input) {
    stdin_input += input;                               // Reading input from STDIN
});

process.stdin.on("end", function () {
   main(stdin_input);
});

function main(input) {

    let no_of_comrades = parseInt(input.split('\n')[0]);
    
    let comradesStrength = input.split('\n')[1].split(' ')
    let temp_comradesStrength = [...comradesStrength];
    let count = 0;
    let positionArray = []
    while (count < no_of_comrades){ //O
        i = count;
        comradesStrength = [...temp_comradesStrength]
        while (comradesStrength.length > 2) {
            
            if (parseInt(comradesStrength[i]) > parseInt(comradesStrength[i+1])) {
                comradesStrength.splice(comradesStrength.indexOf(comradesStrength[i+1]), 1)
            } else if (parseInt(comradesStrength[i]) < parseInt(comradesStrength[i+1])) {
                
                 comradesStrength.splice(comradesStrength.indexOf(comradesStrength[i]), 1)
            }
          
            if (i+1 > comradesStrength.length - 1) {
                i = 0
            }
            
            
            
            
            
          
        }
        
        
        for (var i = 0 ; i < comradesStrength.length; i++) {
            if (positionArray.indexOf(parseInt(temp_comradesStrength.indexOf(comradesStrength[i])) + 1) == -1) {
                positionArray.push(parseInt(temp_comradesStrength.indexOf(comradesStrength[i])) + 1);
            }
        }
        
        
        
        count += 1;
    }
    
    console.log(positionArray.sort(function(a, b){return a - b}).join(' '));
    //console.log(positionArray.sort().join(' '))
    
    
    
    
    //process.stdout.write("Hi, " + input + ".\n");       // Writing output to STDOUT
}

// Warning: Printing unwanted or ill-formatted data to output will cause the test cases to fail


// Write your code here
