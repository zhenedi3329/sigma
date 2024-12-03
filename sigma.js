const state = {
       currentUser: {
           id: 1,
           name: 'John Doe',
           email: 'john@eduflow.com',
           avatar: 'https://ui-avatars.com/api/?name=John+Doe',
           role: 'student'
       },
       courses: [
           {
               id: 1,
               title: 'Advanced Mathematics',
               instructor: 'Dr. Sarah Johnson',
               progress: 75,
               lastAccessed: '2024-11-19'
           },
           {
               id: 2,
               title: 'Physics 101',
               instructor: 'Prof. Michael Chen',
               progress: 60,
               lastAccessed: '2024-11-18'
           },
           {
               id: 3,
               title: 'Web Development',
               instructor: 'Jane Smith',
               progress: 90,
               lastAccessed: '2024-11-19'
           }
       ],
       assignments: [
           {
               id: 1,
               title: 'Math Assignment 3',
               course: 'Advanced Mathematics',
               dueDate: '2024-11-25',
               status: 'pending'
           },
           {
               id: 2,
               title: 'Physics Lab Report',
               course: 'Physics 101',
               dueDate: '2024-11-23',
               status: 'in-progress'
           }
       ],
       schedule: [
           {
               id: 1,
               title: 'Math Lecture',
               time: '09:00 AM',
               duration: '1h 30m',
               type: 'lecture'
           },
           {
               id: 2,
               title: 'Physics Lab',
               time: '11:00 AM',
               duration: '2h',
               type: 'lab'
           }
       ],
       notifications: [
           {
               id: 1,
               type: 'assignment',
               title: 'New Assignment Posted',
               message: 'Math Assignment 4 has been posted',
               time: '5 minutes ago'
           },
           {
               id: 2,
               type: 'course',
               title: 'Course Update',
               message: 'New materials available in Physics 101',
               time: '1 hour ago'
           }
       ]
   };

   // UI Functions
   function showModal(title, content) {
       document.getElementById('modal-title').textContent = title;
       document.getElementById('modal-content').innerHTML = content;
       document.getElementById('modal-overlay').style.display = 'flex';
   }

   function closeModal() {
       document.getElementById('modal-overlay').style.display = 'none';
   }

   function showPopup(popupId) {
       document.getElementById(popupId).style.display = 'block';
   }

   function closePopup(popupId) {
       document.getElementById(popupId).style.display = 'none';
   }

   // Theme Toggle
   function toggleTheme() {
       const body = document.body;
       const currentTheme = body.getAttribute('data-theme');
       const newTheme = currentTheme === 'light' ? 'dark' : 'light';
       body.setAttribute('data-theme', newTheme);
       localStorage.setItem('theme', newTheme);
   }
     // Загрузка данных при старте
     window.onload = function() {
       loadData();
   }

   // Загрузка данных с сервера
   function loadData() {
       fetch('http://127.0.0.1:3001')
           .then(response => response.json())
           .then(data => {
               displayUserInfo(data.user);
               displayCourses(data.courses.active);
               console.log('Данные получены:', data);
           })
           .catch(error => {
               console.error('Ошибка:', error);
               document.getElementById('courses-container').textContent = 'Ошибка получения данных';
           });
   }

   // Отображение информации о пользователе
   function displayUserInfo(user) {
       const userInfoHtml = `
           <div class="card">
               <h2>${user.firstName} ${user.lastName}</h2>
               <p>Email: ${user.email}</p>
               <p>Role: ${user.role}</p>
               <p>GPA: ${user.stats.currentGPA}</p>
           </div>
       `;
       document.getElementById('user-info').innerHTML = userInfoHtml;
   }

   // Отображение курсов
   function displayCourses(courses) {
       const coursesHtml = courses.map(course => `
           <div class="card">
               <h3>${course.title} (${course.code})</h3>
               <p>Instructor: ${course.instructor.name}</p>
               <div class="progress-bar">
                   <div class="progress-fill" style="width: ${course.progress.overall}%"></div>
               </div>
               <p>Progress: ${course.progress.overall}%</p>
           </div>
       `).join('');
       document.getElementById('courses-container').innerHTML = coursesHtml;
   }

   // UI Functions
   function showModal(title, content) {
       document.getElementById('modal-title').textContent = title;
       document.getElementById('modal-content').innerHTML = content;
       document.getElementById('modal-overlay').style.display = 'flex';
   }

   function closeModal() {
       document.getElementById('modal-overlay').style.display = 'none';
   }

   function showPopup(popupId) {
       document.getElementById(popupId).style.display = 'block';
   }

   function closePopup(popupId) {
       document.getElementById(popupId).style.display = 'none';
   }

   // Theme Toggle
   function toggleTheme() {
       const body = document.body;
       const currentTheme = body.getAttribute('data-theme');
       const newTheme = currentTheme === 'light' ? 'dark' : 'light';
       body.setAttribute('data-theme', newTheme);
       localStorage.setItem('theme', newTheme);
   }
   // Course Functions
   function showAllCourses() {
       const content = `
           <div class="grid grid-cols-2 gap-4">
               ${state.courses.map(course => `
                   <div class="card">
                       <div class="card-body">
                           <h3>${course.title}</h3>
                           <p class="text-sm text-secondary">
                               Instructor: ${course.instructor}
                           </p>
                           <div class="progress-bar mt-2">
                               <div class="progress-fill" 
                                    style="width: ${course.progress}%"></div>
                           </div>
                           <div class="flex justify-between mt-4">
                               <button class="btn btn-primary" 
                                       onclick="continueCourse(${course.id})">
                                   Continue
                               </button>
                               <button class="btn btn-outline"
                                       onclick="viewCourseDetails(${course.id})">
                                   Details
                               </button>
                           </div>
                       </div>
                   </div>
               `).join('')}
           </div>
       `;
       showModal('All Courses', content);
   }

   function continueCourse(courseId) {
       const course = state.courses.find(c => c.id === courseId);
       const content = `
           <div class="course-player">
               <div class="video-container mb-4" style="aspect-ratio: 16/9; background: #000;">
                   <!-- Video player will be here -->
               </div>
               <h3>${course.title}</h3>
               <p>Current Progress: ${course.progress}%</p>
               <div class="controls mt-4">
                   <button class="btn btn-primary" onclick="playLesson()">
                       <i class="fas fa-play"></i> Start Lesson
                   </button>
                   <button class="btn btn-outline" onclick="downloadMaterials()">
                       <i class="fas fa-download"></i> Materials
                   </button>
               </div>
           </div>
       `;
       showModal('Continue Course', content);
   }

   // Initialize Application
   document.addEventListener('DOMContentLoaded', () => {
       // Load saved theme
       const savedTheme = localStorage.getItem('theme') || 'light';
       document.body.setAttribute('data-theme', savedTheme);

       // Initialize UI components
       updateActiveCourses();
       updateDeadlines();
       updateSchedule();
       updateActivities();

       // Setup event listeners
       setupEventListeners();
   });

   // Event Listeners
   function setupEventListeners() {
       // Close modal when clicking outside
       document.getElementById('modal-overlay').addEventListener('click', (e) => {
           if (e.target === document.getElementById('modal-overlay')) {
               closeModal();
           }
       });

       // Close modal with Escape key
       document.addEventListener('keydown', (e) => {
           if (e.key === 'Escape') {
               closeModal();
               closeAllPopups();
           }
       });
   }

   // UI Update Functions
   function updateActiveCourses() {
       const coursesList = document.getElementById('active-courses-list');
       coursesList.innerHTML = state.courses.map(course => `
           <div class="list-item">
               <div>
                   <h3>${course.title}</h3>
                   <p class="text-sm text-secondary">
                       Last accessed: ${course.lastAccessed}
                   </p>
               </div>
               <button class="btn btn-primary" 
                       onclick="continueCourse(${course.id})">
                   Continue
               </button>
           </div>
       `).join('');
   }

   function updateDeadlines() {
       const deadlinesList = document.getElementById('deadlines-list');
       deadlinesList.innerHTML = state.assignments.map(assignment => `
           <div class="list-item">
               <div>
                   <h3>${assignment.title}</h3>
                   <p class="text-sm text-secondary">
                       Due: ${assignment.dueDate}
                   </p>
               </div>
               <span class="badge badge-${
                   assignment.status === 'pending' ? 'error' : 
                   assignment.status === 'in-progress' ? 'warning' : 
                   'success'
               }">${assignment.status}</span>
           </div>
       `).join('');
   }function updateSchedule() {
       const scheduleList = document.getElementById('schedule-list');
       scheduleList.innerHTML = state.schedule.map(event => `
           <div class="list-item">
               <div>
                   <h3>${event.title}</h3>
                   <p class="text-sm text-secondary">
                       ${event.time} - ${event.duration}
                   </p>
               </div>
               <span class="badge badge-${
                   event.type === 'lecture' ? 'primary' : 
                   event.type === 'lab' ? 'secondary' : 
                   'info'
               }">${event.type}</span>
           </div>
       `).join('');
   }

   function updateActivities() {
       const activitiesList = document.getElementById('activities-list');
       const activities = [
           { title: 'Completed Math Quiz', time: '2 hours ago', type: 'quiz' },
           { title: 'Submitted Physics Assignment', time: '4 hours ago', type: 'assignment' },
           { title: 'Joined Study Group', time: 'Yesterday', type: 'group' }
       ];

       activitiesList.innerHTML = activities.map(activity => `
           <div class="list-item">
               <div>
                   <h3>${activity.title}</h3>
                   <p class="text-sm text-secondary">${activity.time}</p>
               </div>
               <span class="badge badge-${
                   activity.type === 'quiz' ? 'primary' : 
                   activity.type === 'assignment' ? 'secondary' : 
                   'info'
               }">${activity.type}</span>
           </div>
       `).join('');
   }

   // Notification Functions
   function showNotifications() {
       const content = `
           <div class="notifications-list">
               ${state.notifications.map(notification => `
                   <div class="list-item">
                       <div>
                           <h3>${notification.title}</h3>
                           <p>${notification.message}</p>
                           <p class="text-sm text-secondary">${notification.time}</p>
                       </div>
                       <button class="btn btn-outline btn-sm" 
                               onclick="markAsRead(${notification.id})">
                           Mark as Read
                       </button>
                   </div>
               `).join('')}
           </div>
           <div class="modal-footer">
               <button class="btn btn-outline" onclick="markAllAsRead()">
                   Mark All as Read
               </button>
               <button class="btn btn-primary" onclick="notificationSettings()">
                   Settings
               </button>
           </div>
       `;
       showModal('Notifications', content);
   }

   // Profile Functions
   function showProfile() {
       const content = `
           <div class="profile-content">
               <div class="profile-header mb-4">
                   <img src="${state.currentUser.avatar}" 
                        alt="Profile" 
                        class="profile-avatar">
                   <div>
                       <h3>${state.currentUser.name}</h3>
                       <p class="text-secondary">${state.currentUser.email}</p>
                   </div>
               </div>
               <div class="form-group">
                   <label class="form-label">Display Name</label>
                   <input type="text" class="form-control" 
                          value="${state.currentUser.name}">
               </div>
               <div class="form-group">
                   <label class="form-label">Email</label>
                   <input type="email" class="form-control" 
                          value="${state.currentUser.email}">
               </div>
               <div class="form-group">
                   <label class="form-label">Notification Preferences</label>
                   <div class="checkbox-group">
                       <label class="checkbox-label">
                           <input type="checkbox" checked> 
                           Course Updates
                       </label>
                       <label class="checkbox-label">
                           <input type="checkbox" checked> 
                           Assignment Reminders
                       </label>
                       <label class="checkbox-label">
                           <input type="checkbox" checked> 
                           Discussion Replies
                       </label>
                   </div>
               </div>
               <div class="modal-footer">
                   <button class="btn btn-outline" onclick="changePassword()">
                       Change Password
                   </button>
                   <button class="btn btn-primary" onclick="saveProfile()">
                       Save Changes
                   </button>
               </div>
           </div>
       `;
       showModal('Profile Settings', content);
   }

   // Calendar Functions
   function showCalendar() {
       const content = `
           <div class="calendar-wrapper">
               <div class="calendar-header mb-4">
                   <button class="btn btn-outline" onclick="previousMonth()">
                       <i class="fas fa-chevron-left"></i>
                   </button>
                   <h3 id="current-month">November 2024</h3>
                   <button class="btn btn-outline" onclick="nextMonth()">
                       <i class="fas fa-chevron-right"></i>
                   </button>
               </div>
               <div class="calendar-grid" id="calendar-days">
                   <!-- Will be populated by JavaScript -->
               </div>
               <div class="calendar-events mt-4">
                   <h4>Upcoming Events</h4>
                   <div class="list" id="calendar-events">
                       <!-- Will be populated by JavaScript -->
                   </div>
               </div>
               <div class="modal-footer">
                   <button class="btn btn-outline" onclick="exportCalendar()">
                       Export
                   </button>
                   <button class="btn btn-primary" onclick="addEvent()">
                       Add Event
                   </button>
               </div>
           </div>
       `;
       showModal('Calendar', content);
       initializeCalendar();
   }

   // Task Functions
   function showTasks() {
       const content = `
           <div class="tasks-wrapper">
               <div class="tabs mb-4">
                   <button class="tab active" onclick="showTaskTab('all')">All</button>
                   <button class="tab" onclick="showTaskTab('pending')">Pending</button>
                   <button class="tab" onclick="showTaskTab('completed')">Completed</button>
               </div>
               <div class="tasks-list" id="tasks-container">
                   <!-- Will be populated by JavaScript -->
               </div>
               <div class="modal-footer">
                   <button class="btn btn-outline" onclick="filterTasks()">
                       Filter
                   </button>
                   <button class="btn btn-primary" onclick="addTask()">
                       Add Task
                   </button>
               </div>
           </div>
       `;
       showModal('Tasks', content);
       loadTasks('all');
   }

   // Study Session Functions
   function startStudying() {
       const content = `
           <div class="study-session">
               <div class="video-container mb-4">
                   <div class="video-player">
                       <!-- Video player placeholder -->
                       <div style="aspect-ratio: 16/9; background: #000; 
                                 display: flex; align-items: center; 
                                 justify-content: center; color: white;">
                           Video Player
                       </div>
                   </div>
               </div>
               <div class="study-controls">
                   <div class="progress-bar mb-2">
                       <div class="progress-fill" style="width: 45%"></div>
                   </div>
                   <div class="controls-buttons">
                       <button class="btn btn-outline" onclick="previousSection()">
                           <i class="fas fa-step-backward"></i>
                       </button>
                       <button class="btn btn-primary" onclick="togglePlayPause()">
                           <i class="fas fa-play"></i>
                       </button>
                       <button class="btn btn-outline" onclick="nextSection()">
                           <i class="fas fa-step-forward"></i>
                       </button>
                       <button class="btn btn-outline" onclick="toggleFullscreen()">
                           <i class="fas fa-expand"></i>
                       </button>
                   </div>
               </div>
               <div class="study-materials mt-4">
                   <h4>Study Materials</h4>
                   <div class="list">
                       <div class="list-item">
                           <span>Lecture Notes</span>
                           <button class="btn btn-outline btn-sm" 
                                   onclick="downloadMaterial('notes')">
                               Download
                           </button>
                       </div>
                       <div class="list-item">
                           <span>Practice Problems</span>
                           <button class="btn btn-outline btn-sm" 
                                   onclick="downloadMaterial('problems')">
                               Download
                           </button>
                       </div>
                   </div>
               </div>
           </div>
       `;
       showModal('Study Session', content);
   }

   // Utility Functions
   function formatDate(date) {
       return new Date(date).toLocaleDateString('en-US', {
           year: 'numeric',
           month: 'long',
           day: 'numeric'
       });
   }

   function formatTime(time) {
       return new Date(`2000/01/01 ${time}`).toLocaleTimeString('en-US', {
           hour: 'numeric',
           minute: '2-digit'
       });
   }

   // Initialize the application
   document.addEventListener('DOMContentLoaded', () => {
       initializeApp();
   });

