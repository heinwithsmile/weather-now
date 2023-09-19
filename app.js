// Sample code to fetch weather data from an API
async function getWeatherData(city) {
    const apiKey = '88ca0e1f9619d52dd6856fd5a82a4521';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
}

function translateToMyanmar(text) {
    const translations = {
        'Temperature' : 'အပူချိန်',
        'Description' : 'ဖော်ပြချက်',
        'Yangon' : 'ရန်ကုန်မြို့',
        'light rain' : 'မိုးဖွဲဖွဲလေးရွာမည်',
        'moderate rain' : 'အသင့်အတင့်ရွာမည်',
    }

    if (translations[text]){
        return translations[text];
    }else{
        return text;
    }
}

const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value;
    if (city.trim() === '') {
        alert('ကျေးဇူးပြု၍ မြို့အမည်ကို ထည့်ပါ။');
        return;
    }

    try {
        const weatherData = await getWeatherData(city);
        const translatedTemperature = translateToMyanmar('Temperature');
        const translatedDescription = translateToMyanmar('Description');
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const translatedDesc = translateToMyanmar(description);
        const cityName = translateToMyanmar(weatherData.name);
        // const country = weatherData.sys.country;

        weatherInfo.innerHTML = `
            <h2>${cityName} ရဲ့ ရာသီဥတု အခြေနေမှာ</h2>
            <p>${translatedTemperature} : ${temperature}°C</p>
            <p>${translatedDescription} : ${translatedDesc}</p>
        `;
    } catch (error) {
        console.error(error);
        weatherInfo.innerHTML = '<p>မိုးလေဝသဒေတာကို ရယူ၍မရပါ။ နောက်မှ ထပ်စမ်းကြည့်ပါ။</p>';
    }
});