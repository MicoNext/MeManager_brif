  const audio = document.getElementById('bgMusic');
    const audioToggle = document.getElementById('audioToggle');
    const musicModal = document.getElementById('musicModal');
    const enableMusicBtn = document.getElementById('enableMusic');
    const disableMusicBtn = document.getElementById('disableMusic');
    const navContainer = document.getElementById('navContainer');
    
    let isPlaying = false;
    let musicPreference = localStorage.getItem('musicPreference');

    if (musicPreference === null) {
      setTimeout(() => {
        musicModal.style.display = 'flex';
      }, 1000);
    } else if (musicPreference === 'enabled') {
      audio.play().then(() => {
        isPlaying = true;
        audioToggle.textContent = '❚❚';
      });
    }

    enableMusicBtn.addEventListener('click', () => {
      audio.play().then(() => {
        isPlaying = true;
        audioToggle.textContent = '❚❚';
        localStorage.setItem('musicPreference', 'enabled');
      });
      musicModal.style.display = 'none';
    });

    disableMusicBtn.addEventListener('click', () => {
      localStorage.setItem('musicPreference', 'disabled');
      musicModal.style.display = 'none';
    });

    audioToggle.addEventListener('click', () => {
      if (isPlaying) {
        audio.pause();
        audioToggle.textContent = '♪';
      } else {
        audio.play();
        audioToggle.textContent = '❚❚';
      }
      isPlaying = !isPlaying;
    });

    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        const section = document.getElementById(`section-${sectionId}`);
        const headerHeight = document.querySelector('.nav-wrapper').offsetHeight;
        const sectionPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
          top: sectionPosition,
          behavior: 'smooth'
        });
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id.split('-')[1];
          document.querySelectorAll('.nav-item').forEach(item => {
            if (item.getAttribute('data-section') === id) {
              item.classList.add('active');
              
              const navWrapper = document.querySelector('.nav-wrapper');
              const itemLeft = item.offsetLeft;
              const itemWidth = item.offsetWidth;
              const wrapperWidth = navWrapper.offsetWidth;
              
              navWrapper.scrollTo({
                left: itemLeft - (wrapperWidth / 2) + (itemWidth / 2),
                behavior: 'smooth'
              });
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, { 
      threshold: 0.5,
      rootMargin: '-60px 0px -200px 0px' // Увеличили нижний отступ для лучшего определения последней секции
    });

    // Добавляем обработчик для последней секции при скролле до конца страницы
    window.addEventListener('scroll', () => {
      const lastSection = document.getElementById('section-10');
      const lastSectionRect = lastSection.getBoundingClientRect();
      const navItems = document.querySelectorAll('.nav-item');
      
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        navItems.forEach(item => {
          if (item.getAttribute('data-section') === '10') {
            item.classList.add('active');
            
            const navWrapper = document.querySelector('.nav-wrapper');
            const itemLeft = item.offsetLeft;
            const itemWidth = item.offsetWidth;
            const wrapperWidth = navWrapper.offsetWidth;
            
            navWrapper.scrollTo({
              left: itemLeft - (wrapperWidth / 2) + (itemWidth / 2),
              behavior: 'smooth'
            });
          } else {
            item.classList.remove('active');
          }
        });
      }
    });

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });