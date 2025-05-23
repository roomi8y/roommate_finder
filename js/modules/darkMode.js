/**
 * Dark Mode Toggle
 */
export function initDarkModeToggle() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  
  if (darkModeToggle) {
    // Check system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check saved preference
    const savedPreference = localStorage.getItem('darkMode');
    
    // Set initial state
    if (savedPreference === 'dark' || (savedPreference !== 'light' && prefersDarkMode)) {
      document.documentElement.classList.add('dark-mode');
      darkModeToggle.classList.add('active');
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
      document.documentElement.classList.toggle('dark-mode');
      this.classList.toggle('active');
      
      // Save preference
      if (document.documentElement.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'dark');
      } else {
        localStorage.setItem('darkMode', 'light');
      }
    });
  }
}
