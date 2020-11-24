const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { countReset } = require("console");
const { create } = require("domain");


const people = [];

const getPersonInfo = () => {
   inquirer.prompt([
    {
      type: "input",
      message: "What is your manager's name?",
      name: "managername",
    },
    {
      type: "input",
      message: "What is your manager's id?",
      name: "managerid",
    },
    {
      type: "input",
      message: "What is your manager's email?",
      name: "manageremail",
    },
    {
      type: "input",
      message: "What is your manager's office number?",
      name: "manageroffice",
    },
  
  ]).then((managerInfo) =>{
    createManager(managerInfo)
  })
};

const createManager = (personInfo) => {
  const manager = new Manager (personInfo.managername, personInfo.managerid, personInfo.manageremail, personInfo.manageroffice)
  people.push(manager);
  loop();
};

const createEngineer = (personInfo) => {
  const engineer = new Engineer (personInfo.engineername, personInfo.engineerid, personInfo.engineeremail, personInfo.engineergit)
  people.push(engineer);
  loop();
};

const createIntern = (personInfo) => {
  const intern = new Intern (personInfo.internname, personInfo.internrid, personInfo.internemail, personInfo.internschool)
  people.push(intern);
  loop();
};

const createTeam = () => {
  if (!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR);
  }fs.writeFileSync(outputPath, render(people), "utf-8");

}

const getEngineerInfo = () => {
  inquirer.prompt ([
    {
      type:"input",
      message:"What is the Engineers name?",
      name:'engineername',
    },
    {
      type:"input",
      message:"What is the Engineers id?",
      name:'engineerid',
    },
    {
      type:"input",
      message:"What is the Engineers email",
      name:'engineeremail',
    },
    {
      type:"input",
      message:"What is the Engineers Github?",
      name:'engineergit',
    }
    

  ]).then((engineeringInfo) => {
   createEngineer(engineeringInfo)
  }) 

}

const getInternInfo = () => {
  inquirer.prompt ([
    {
      type:"input",
      message:"What is the Intern's name?",
      name:'internname',
    },
    {
      type:"input",
      message:"What is the Intern's id?",
      name:'internrid',
    },
    {
      type:"input",
      message:"What is the Intern's email?",
      name:'internemail',
    },
    {
      type:"input",
      message:"What is the Interns Schools?",
      name:'internschool',
    }
    

  ]).then((internInfo) => {
   createIntern(internInfo)
  }) 

}

const loop = () => {
 inquirer.prompt([
   {
     type: "list",
     name: "teammember",
     choices: [
       "Engineer", "Intern", "I dont want to add any more team members."
     ]
   }
 ])
    .then((personInfo) => {

      switch(personInfo.teammember){
        case 'I dont want to add any more team members.':
          createTeam();
        break;

        case 'Engineer':
        getEngineerInfo()
        break;

        
        case 'Intern':
        getInternInfo()
        break;
      }
    })

};

getPersonInfo();





