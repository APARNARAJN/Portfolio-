let soundEnabled = true;

        function openModal(id) {
            const modal = document.getElementById(id);
            modal.classList.add('active');
            
            if (soundEnabled) playSound('open');
        }

        function closeModal(id) {
            const modal = document.getElementById(id);
            modal.classList.remove('active');
            if (soundEnabled) playSound('close');
        }

        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal.id);
                }
            });
        });

        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            if (soundEnabled) playSound('toggle');
        }

        function toggleSound() {
            soundEnabled = !soundEnabled;
            if (soundEnabled) playSound('toggle');
        }

        function playSound(type) {
            // Create simple beep sounds
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            const frequencies = {
                'open': 800,
                'close': 600,
                'toggle': 1000
            };
            
            oscillator.frequency.value = frequencies[type] || 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }

        function handleSubmit(event) {
            event.preventDefault();
            alert('Thanks for your message! (This is a demo form)');
            event.target.reset();
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    closeModal(modal.id);
                });
            }
        });