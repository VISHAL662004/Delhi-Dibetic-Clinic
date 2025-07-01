
// Appointment Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initAppointmentForm();
    initDateValidation();
    initDepartmentDoctorMapping();
    initFormAnimations();
});

// Main form initialization
function initAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    if (!form) return;
    
    // Add real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });
    
    // Handle form submission
    form.addEventListener('submit', handleFormSubmission);
}

// Date validation (prevent past dates and weekends)
function initDateValidation() {
    const dateInput = document.getElementById('date');
    if (!dateInput) return;
    
    // Set minimum date to today
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
    
    // Set maximum date to 3 months from now
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 3);
    dateInput.max = maxDate.toISOString().split('T')[0];
    
    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const dayOfWeek = selectedDate.getDay();
        
        // Check if it's a weekend (0 = Sunday, 6 = Saturday)
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            showError(this, 'Please select a weekday (Monday-Friday)');
            this.value = '';
        } else {
            clearError(this);
            updateAvailableTimeSlots(selectedDate);
        }
    });
}

// Update available time slots based on selected date
function updateAvailableTimeSlots(selectedDate) {
    const timeSelect = document.getElementById('time');
    if (!timeSelect) return;
    
    // Simulate different availability for different days
    const dayOfWeek = selectedDate.getDay();
    const options = timeSelect.querySelectorAll('option');
    
    options.forEach(option => {
        if (option.value) {
            // Simulate some time slots being unavailable
            const hour = parseInt(option.value.split(':')[0]);
            const isUnavailable = Math.random() < 0.2; // 20% chance of being unavailable
            
            if (isUnavailable) {
                option.disabled = true;
                option.textContent = option.textContent.replace(' (Unavailable)', '') + ' (Unavailable)';
            } else {
                option.disabled = false;
                option.textContent = option.textContent.replace(' (Unavailable)', '');
            }
        }
    });
}

// Department and doctor mapping
function initDepartmentDoctorMapping() {
    const departmentSelect = document.getElementById('department');
    const doctorSelect = document.getElementById('doctor');
    
    if (!departmentSelect || !doctorSelect) return;
    
    const doctorsByDepartment = {
        'general': ['dr-johnson', 'dr-williams'],
        'cardiology': ['dr-chen'],
        'pediatrics': ['dr-rodriguez'],
        'orthopedics': ['dr-williams'],
        'dermatology': ['dr-johnson'],
        'neurology': ['dr-chen'],
        'gynecology': ['dr-rodriguez']
    };
    
    const doctorNames = {
        'dr-johnson': 'Dr. Sarah Johnson',
        'dr-chen': 'Dr. Michael Chen',
        'dr-rodriguez': 'Dr. Emily Rodriguez',
        'dr-williams': 'Dr. Robert Williams',
        'dr-thompson': 'Dr. Lisa Thompson'
    };
    
    departmentSelect.addEventListener('change', function() {
        const selectedDepartment = this.value;
        const availableDoctors = doctorsByDepartment[selectedDepartment] || [];
        
        // Clear current options except the first one
        doctorSelect.innerHTML = '<option value="">Any Available Doctor</option>';
        
        // Add relevant doctors
        availableDoctors.forEach(doctorId => {
            const option = document.createElement('option');
            option.value = doctorId;
            option.textContent = doctorNames[doctorId];
            doctorSelect.appendChild(option);
        });
        
        // Add animation to doctor select
        doctorSelect.style.opacity = '0.5';
        setTimeout(() => {
            doctorSelect.style.opacity = '1';
        }, 200);
    });
}

// Form validation
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(field)} is required`;
    }
    
    // Specific field validations
    if (value && fieldName === 'email') {
        if (!validateEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    if (value && fieldName === 'phone') {
        if (!validatePhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    if (value && fieldName === 'fullName') {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }
    }
    
    if (value && fieldName === 'date') {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate <= today) {
            isValid = false;
            errorMessage = 'Please select a future date';
        }
    }
    
    // Checkbox validation
    if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    if (!isValid) {
        showError(field, errorMessage);
    }
    
    return isValid;
}

function getFieldLabel(field) {
    const label = field.closest('.form-group').querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : field.name;
}

// Form submission handler
async function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.btn-submit');
    
    // Validate all fields
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    // Check terms checkbox
    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox && !termsCheckbox.checked) {
        showError(termsCheckbox, 'You must agree to the terms and conditions');
        isFormValid = false;
    }
    
    if (!isFormValid) {
        // Scroll to first error
        const firstError = form.querySelector('.form-group.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // Show loading state
    submitButton.classList.add('loading');
    
    try {
        // Simulate API call
        await simulateFormSubmission(new FormData(form));
        
        // Show success modal
        showConfirmationModal();
        
        // Reset form
        form.reset();
        
    } catch (error) {
        console.error('Form submission error:', error);
        alert('There was an error submitting your appointment request. Please try again.');
    } finally {
        submitButton.classList.remove('loading');
    }
}

// Simulate form submission to server
function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Simulate 95% success rate
            if (Math.random() < 0.95) {
                console.log('Appointment request submitted:', Object.fromEntries(formData));
                resolve();
            } else {
                reject(new Error('Network error'));
            }
        }, 2000);
    });
}

// Modal functionality
function showConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Add escape key listener
        document.addEventListener('keydown', handleModalEscape);
    }
}

function closeModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Remove escape key listener
        document.removeEventListener('keydown', handleModalEscape);
    }
}

function handleModalEscape(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

// Click outside modal to close
document.addEventListener('click', function(e) {
    const modal = document.getElementById('confirmationModal');
    if (modal && e.target === modal) {
        closeModal();
    }
});

// Form animations
function initFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    
    // Add focus animations
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        if (!input) return;
        
        input.addEventListener('focus', function() {
            group.classList.add('focused');
            
            // Add ripple effect to form group
            createInputRipple(group);
        });
        
        input.addEventListener('blur', function() {
            if (!input.value) {
                group.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            group.classList.add('focused');
        }
    });
    
    // Animate form sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    const formSections = document.querySelectorAll('.form-group, .info-item');
    formSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(section);
    });
}

function createInputRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.left = '0';
    ripple.style.top = '0';
    ripple.style.width = '100%';
    ripple.style.height = '2px';
    ripple.style.background = 'var(--primary-blue)';
    ripple.style.transform = 'scaleX(0)';
    ripple.style.transformOrigin = 'left';
    ripple.style.animation = 'inputRipple 0.3s ease-out';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 300);
}

// Add CSS for form animations
const appointmentStyles = `
    @keyframes inputRipple {
        to {
            transform: scaleX(1);
        }
    }
    
    .form-group.focused {
        transform: scale(1.02);
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        border-color: var(--primary-blue);
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
        transform: translateY(-1px);
    }
    
    .btn-submit {
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .btn-submit:hover:not(.loading) {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
    }
    
    .btn-submit:active {
        transform: translateY(0);
    }
    
    .modal-content {
        animation: modalBounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    @keyframes modalBounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3) translateY(-100px);
        }
        50% {
            opacity: 1;
            transform: scale(1.05) translateY(0);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
        }
    }
`;

const appointmentStyleSheet = document.createElement('style');
appointmentStyleSheet.textContent = appointmentStyles;
document.head.appendChild(appointmentStyleSheet);

// Input formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{3})/, '($1) $2');
            }
            e.target.value = value;
        });
    }
});

// Console log for debugging
console.log('🏥 Appointment form initialized');
