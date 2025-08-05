// Main JavaScript file for Dr. Jorge Vasquez website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Loading states for buttons
    function showLoading(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="loading"></span> Procesando...';
        button.disabled = true;
        
        return function() {
            button.innerHTML = originalText;
            button.disabled = false;
        };
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const resetLoading = showLoading(submitBtn);
            
            // Simulate form submission
            setTimeout(() => {
                resetLoading();
                showAlert('success', 'Mensaje enviado correctamente. Te contactaremos pronto.');
                this.reset();
            }, 2000);
        });
    }

    // Appointment form handling
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const resetLoading = showLoading(submitBtn);
            
            // Simulate appointment booking
            setTimeout(() => {
                resetLoading();
                showAlert('success', 'Cita agendada exitosamente. Te confirmaremos por correo.');
                this.reset();
            }, 2000);
        });
    }

    // Second opinion form handling
    const secondOpinionForm = document.getElementById('secondOpinionForm');
    if (secondOpinionForm) {
        secondOpinionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const resetLoading = showLoading(submitBtn);
            
            // Simulate second opinion request
            setTimeout(() => {
                resetLoading();
                showAlert('success', 'Solicitud de segunda opinión enviada. Te contactaremos para coordinar.');
                this.reset();
            }, 2000);
        });
    }

    // Alert system
    function showAlert(type, message) {
        const alertContainer = document.getElementById('alertContainer') || createAlertContainer();
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        alertContainer.appendChild(alert);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }

    function createAlertContainer() {
        const container = document.createElement('div');
        container.id = 'alertContainer';
        container.className = 'position-fixed top-0 end-0 p-3';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
        return container;
    }

    // Privacy consent handling
    function checkPrivacyConsent() {
        if (!localStorage.getItem('privacyConsent')) {
            showPrivacyBanner();
        }
    }

    function showPrivacyBanner() {
        const banner = document.createElement('div');
        banner.className = 'position-fixed bottom-0 start-0 end-0 bg-dark text-white p-3';
        banner.style.zIndex = '9998';
        banner.innerHTML = `
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <p class="mb-0">
                            <i class="fas fa-cookie-bite me-2"></i>
                            Este sitio utiliza cookies y almacena datos para mejorar tu experiencia. 
                            Al continuar navegando, aceptas nuestras políticas de privacidad.
                        </p>
                    </div>
                    <div class="col-md-4 text-md-end">
                        <button class="btn btn-outline-light me-2" onclick="showPrivacyPolicy()">Más info</button>
                        <button class="btn btn-warning" onclick="acceptPrivacy()">Aceptar</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        window.privacyBanner = banner;
    }

    window.acceptPrivacy = function() {
        localStorage.setItem('privacyConsent', 'true');
        if (window.privacyBanner) {
            window.privacyBanner.remove();
        }
    };

    window.showPrivacyPolicy = function() {
        // Redirect to privacy policy page
        window.open('/aplicaciones/DosVidas/politicas-privacidad.html', '_blank');
    };

    // Initialize privacy consent check
    checkPrivacyConsent();

    // Medical disclaimer for calculators
    function showMedicalDisclaimer(container) {
        const disclaimer = document.createElement('div');
        disclaimer.className = 'medical-disclaimer';
        disclaimer.innerHTML = `
            <div class="d-flex">
                <i class="fas fa-exclamation-triangle me-2 mt-1"></i>
                <div>
                    <strong>Aviso Médico:</strong> Esta calculadora es solo para fines informativos y educativos. 
                    Los resultados no reemplazan el criterio médico profesional. Siempre consulta con tu médico 
                    para obtener un diagnóstico y tratamiento adecuados.
                </div>
            </div>
        `;
        
        container.insertBefore(disclaimer, container.firstChild);
    }

    // Add medical disclaimer to calculator pages
    const calculatorContainers = document.querySelectorAll('.calculator-container');
    calculatorContainers.forEach(container => {
        showMedicalDisclaimer(container);
    });

    // Date picker initialization for appointment forms
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        input.setAttribute('min', today);
        
        // Set maximum date to 6 months from today
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 6);
        input.setAttribute('max', maxDate.toISOString().split('T')[0]);
    });

    // Time slot validation
    const timeInputs = document.querySelectorAll('input[type="time"]');
    timeInputs.forEach(input => {
        input.addEventListener('change', function() {
            const time = this.value;
            const [hours, minutes] = time.split(':').map(Number);
            
            // Check if time is within office hours (8 AM to 6 PM)
            if (hours < 8 || hours >= 18) {
                showAlert('warning', 'Por favor selecciona un horario entre 8:00 AM y 6:00 PM');
                this.value = '';
            }
        });
    });

    // File upload validation for second opinions
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const files = Array.from(this.files);
            const maxSize = 10 * 1024 * 1024; // 10MB
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            
            files.forEach(file => {
                if (file.size > maxSize) {
                    showAlert('error', `El archivo ${file.name} es muy grande. Máximo 10MB.`);
                    this.value = '';
                    return;
                }
                
                if (!allowedTypes.includes(file.type)) {
                    showAlert('error', `Tipo de archivo no permitido: ${file.name}. Solo PDF, JPG y PNG.`);
                    this.value = '';
                    return;
                }
            });
        });
    });

    // Analytics tracking (placeholder for future implementation)
    function trackEvent(category, action, label) {
        // Placeholder for analytics tracking
        console.log('Event tracked:', { category, action, label });
    }

    // Track calculator usage
    document.querySelectorAll('.calculator-container button').forEach(button => {
        button.addEventListener('click', function() {
            const calculatorType = this.closest('.calculator-container').getAttribute('data-calculator');
            trackEvent('Calculator', 'Calculate', calculatorType);
        });
    });

    // Track appointment bookings
    document.querySelectorAll('a[href*="citas"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Appointment', 'Book', 'Header Link');
        });
    });

    console.log('Dr. Jorge Vasquez website initialized successfully');
});
