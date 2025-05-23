// Placeholder for Arabic translations
const translations = {
    "Home": "الرئيسية",
    "Male Listings": "قوائم الذكور",
    "Female Listings": "قوائم الإناث",
    "How It Works": "كيف يعمل",
    "About Us": "عنا",
    "Contact": "اتصل بنا",
    "Login": "تسجيل الدخول",
    "Sign Up": "اشتراك",
    "Find Your Perfect Roommate in Saudi Arabia": "ابحث عن رفيق السكن المثالي في المملكة العربية السعودية",
    "Connect with compatible roommates": "تواصل مع رفقاء سكن متوافقين في بيئة آمنة ومناسبة ثقافيًا. ابحث عن وضع السكن المشترك المثالي اليوم.",
    "Male Section": "قسم الذكور",
    "Female Section": "قسم الإناث",
    "Select City": "اختر المدينة",
    "Price Range": "نطاق السعر",
    "Find Rooms": "ابحث عن غرف",
    "Why Choose Roomaity?": "لماذا تختار روميتي؟",
    "Safe & Secure": "آمن ومضمون",
    "Culturally Appropriate": "مناسب ثقافيًا",
    "Smart Matching": "مطابقة ذكية",
    "Create Profile": "إنشاء ملف شخصي",
    "List or Search": "أضف قائمة أو ابحث",
    "Connect": "تواصل",
    "Move In": "انتقل للسكن",
    "Featured Listings": "القوائم المميزة",
    "For Males": "للذكور",
    "For Females": "للإناث",
    "View Details": "عرض التفاصيل",
    "View All Male Listings": "عرض جميع قوائم الذكور",
    "View All Female Listings": "عرض جميع قوائم الإناث",
    "Find Your Ideal Roommate": "ابحث عن رفيق السكن المثالي",
    "Male Roommates": "رفقاء سكن ذكور",
    "Female Roommates": "رفقاء سكن إناث",
    "View Profile": "عرض الملف الشخصي",
    "View All Male Roommates": "عرض جميع رفقاء السكن الذكور",
    "View All Female Roommates": "عرض جميع رفقاء السكن الإناث",
    "What Our Users Say": "ماذا يقول مستخدمونا",
    "Ready to Find Your Perfect Roommate?": "هل أنت مستعد للعثور على رفيق السكن المثالي؟",
    "Sign Up Now": "اشترك الآن",
    "Quick Links": "روابط سريعة",
    "Legal": "قانوني",
    "Privacy Policy": "سياسة الخصوصية",
    "Terms of Service": "شروط الخدمة",
    "Follow Us": "تابعنا",
    "© 2024 Roomaity. All rights reserved.": "© 2024 روميتي. جميع الحقوق محفوظة.",
    "Search": "بحث",
    "Messages": "رسائل",
    "Profile": "الملف الشخصي"
    // Add more translations as needed
};

function translateToArabic() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key]) {
            // Store original English text if not already stored
            if (!element.hasAttribute('data-original-text')) {
                element.setAttribute('data-original-text', element.textContent.trim());
            }
            element.textContent = translations[key];
        }
    });
}

function translateToEnglish() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        if (element.hasAttribute('data-original-text')) {
            element.textContent = element.getAttribute('data-original-text');
        }
    });
}

