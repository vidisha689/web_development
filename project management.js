// Initialize projects array to store data in localStorage
let projects = JSON.parse(localStorage.getItem('projects')) || [];

const projectNameInput = document.getElementById('project-name');
const projectDescriptionInput = document.getElementById('project-description');
const projectsUl = document.getElementById('projects-ul');

// Create a project
function createProject() {
  const projectName = projectNameInput.value.trim();
  const projectDescription = projectDescriptionInput.value.trim();

  if (projectName === '') {
    alert('Project name is required');
    return;
  }

  const project = {
    id: Date.now(),
    name: projectName,
    description: projectDescription,
    tasks: []
  };

  // Add project to the list and save to localStorage
  projects.push(project);
  localStorage.setItem('projects', JSON.stringify(projects));
  renderProjects();
  
  // Clear inputs
  projectNameInput.value = '';
  projectDescriptionInput.value = '';
}

// Add a task to a project
function addTaskToProject(projectId) {
  const taskName = prompt('Enter task name:');
  const taskDeadline = prompt('Enter task deadline (YYYY-MM-DD):');
  
  if (!taskName || !taskDeadline) {
    alert('Both task name and deadline are required');
    return;
  }

  const task = {
    id: Date.now(),
    name: taskName,
    deadline: taskDeadline,
    completed: false
  };

  const project = projects.find(p => p.id === projectId);
  project.tasks.push(task);
  
  // Update localStorage and render tasks
  localStorage.setItem('projects', JSON.stringify(projects));
  renderProjects();
}

// Toggle task completion
function toggleTaskCompletion(projectId, taskId) {
  const project = projects.find(p => p.id === projectId);
  const task = project.tasks.find(t => t.id === taskId);
  task.completed = !task.completed;
  
  // Update localStorage and render tasks
  localStorage.setItem('projects', JSON.stringify(projects));
  renderProjects();
}

// Render projects and tasks
function renderProjects() {
  projectsUl.innerHTML = '';
  
  projects.forEach(project => {
    const projectLi = document.createElement('li');
    projectLi.classList.add('project-item');
    
    projectLi.innerHTML = `
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <button onclick="addTaskToProject(${project.id})">Add Task</button>
      
      <ul class="task-list">
        ${project.tasks.map(task => `
          <li class="task-item">
            <div class="task-info">
              <strong>${task.name}</strong> - Due: ${task.deadline}
            </div>
            <div>
              <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskCompletion(${project.id}, ${task.id})" />
            </div>
          </li>
        `).join('')}
      </ul>
    `;
    
    projectsUl.appendChild(projectLi);
  });
}

// Initial render
renderProjects();