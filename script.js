function calculateCalories() {
    // الحصول على قيم المدخلات
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);

    // التحقق من صحة المدخلات
    if (!validateInputs(weight, height, age)) {
        showError('الرجاء إدخال جميع البيانات المطلوبة بشكل صحيح');
        return;
    }

    // حساب معدل الأيض الأساسي (BMR)
    const bmr = calculateBMR(weight, height, age, gender);

    // حساب السعرات الحرارية اليومية
    const dailyCalories = Math.round(bmr * activity);

    // حساب مؤشر كتلة الجسم (BMI)
    const bmi = calculateBMI(weight, height);

    // عرض النتائج مع تأثيرات حركية
    showResults(dailyCalories, bmi);
}

function validateInputs(weight, height, age) {
    if (!weight || !height || !age) return false;
    if (weight <= 0 || height <= 0 || age <= 0) return false;
    if (weight > 300 || height > 300 || age > 120) return false;
    return true;
}

function calculateBMR(weight, height, age, gender) {
    if (gender === 'male') {
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    }
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
}

function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return getBMIDetails(bmi);
}

function getBMIDetails(bmi) {
    const categories = {
        underweight: { limit: 18.5, text: 'نقص في الوزن', color: '#3498db' },
        normal: { limit: 25, text: 'وزن طبيعي', color: '#2ecc71' },
        overweight: { limit: 30, text: 'زيادة في الوزن', color: '#f1c40f' },
        obese: { limit: Infinity, text: 'سمنة', color: '#e74c3c' }
    };

    for (const [category, data] of Object.entries(categories)) {
        if (bmi < data.limit) {
            return `${bmi.toFixed(1)} - ${data.text}`;
        }
    }
}

function showResults(dailyCalories, bmi) {
    // إظهار قسم النتائج مع تأثير حركي
    const resultCard = document.getElementById('resultCard');
    resultCard.style.display = 'block';
    resultCard.classList.add('animate__fadeIn');

    // تحديث النتائج مع تأثير العداد
    animateCounter('dailyCalories', dailyCalories);
    document.getElementById('bmi').textContent = bmi;
    animateCounter('weightLoss', Math.round(dailyCalories * 0.8));
    animateCounter('weightGain', Math.round(dailyCalories * 1.2));
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    const duration = 1000; // مدة الحركة بالمللي ثانية
    const steps = 50; // عدد خطوات الحركة
    const increment = targetValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        current += increment;
        element.textContent = Math.round(current);

        if (step >= steps) {
            clearInterval(timer);
            element.textContent = targetValue;
        }
    }, duration / steps);
}

function showError(message) {
    // يمكنك إضافة مكتبة للتنبيهات الجميلة مثل SweetAlert2
    alert(message);
}