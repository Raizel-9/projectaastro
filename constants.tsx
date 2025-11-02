import { ZodiacSignInfo } from './types';
import {
    AriesIcon, TaurusIcon, GeminiIcon, CancerIcon, LeoIcon, VirgoIcon,
    LibraIcon, ScorpioIcon, SagittariusIcon, CapricornIcon, AquariusIcon, PiscesIcon
} from './components/icons/ZodiacIcons';

export const WESTERN_ZODIAC_SIGNS: ZodiacSignInfo[] = [
    { sign: 'Aries', dateRange: 'Mar 21 - Apr 19', symbol: AriesIcon },
    { sign: 'Taurus', dateRange: 'Apr 20 - May 20', symbol: TaurusIcon },
    { sign: 'Gemini', dateRange: 'May 21 - Jun 20', symbol: GeminiIcon },
    { sign: 'Cancer', dateRange: 'Jun 21 - Jul 22', symbol: CancerIcon },
    { sign: 'Leo', dateRange: 'Jul 23 - Aug 22', symbol: LeoIcon },
    { sign: 'Virgo', dateRange: 'Aug 23 - Sep 22', symbol: VirgoIcon },
    { sign: 'Libra', dateRange: 'Sep 23 - Oct 22', symbol: LibraIcon },
    { sign: 'Scorpio', dateRange: 'Oct 23 - Nov 21', symbol: ScorpioIcon },
    { sign: 'Sagittarius', dateRange: 'Nov 22 - Dec 21', symbol: SagittariusIcon },
    { sign: 'Capricorn', dateRange: 'Dec 22 - Jan 19', symbol: CapricornIcon },
    { sign: 'Aquarius', dateRange: 'Jan 20 - Feb 18', symbol: AquariusIcon },
    { sign: 'Pisces', dateRange: 'Feb 19 - Mar 20', symbol: PiscesIcon },
];

// Images from Wikipedia Commons, Public Domain (Rider-Waite deck published before 1923)
export const TAROT_CARD_IMAGES: { [key: string]: string } = {
  'the-fool': 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg',
  'the-magician': 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
  'the-high-priestess': 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg',
  'the-empress': 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg',
  'the-emperor': 'https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg',
  'the-hierophant': 'https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg',
  'the-lovers': 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg',
  'the-chariot': 'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
  'strength': 'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
  'the-hermit': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg',
  'wheel-of-fortune': 'https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg',
  'justice': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg',
  'the-hanged-man': 'https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg',
  'death': 'https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg',
  'temperance': 'https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg',
  'the-devil': 'https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg',
  'the-tower': 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
  'the-star': 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg',
  'the-moon': 'https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg',
  'the-sun': 'https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg',
  'judgement': 'https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg',
  'the-world': 'https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg',
};

export const COUNTRIES: string[] = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the",
    "Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica",
    "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
    "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
    "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
    "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
    "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua new Guinea", "Paraguay",
    "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",

    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain",
    "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste",
    "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export const LUNAR_NEW_YEAR_DATES: { [year: number]: string } = {
    1930: '01-30', 1931: '02-17', 1932: '02-06', 1933: '01-26', 1934: '02-14',
    1935: '02-04', 1936: '01-24', 1937: '02-11', 1938: '01-31', 1939: '02-19',
    1940: '02-08', 1941: '01-27', 1942: '02-15', 1943: '02-05', 1944: '01-25',
    1945: '02-13', 1946: '02-02', 1947: '01-22', 1948: '02-10', 1949: '01-29',
    1950: '02-17', 1951: '02-06', 1952: '01-27', 1953: '02-14', 1954: '02-03',
    1955: '01-24', 1956: '02-12', 1957: '01-31', 1958: '02-18', 1959: '02-08',
    1960: '01-28', 1961: '02-15', 1962: '02-05', 1963: '01-25', 1964: '02-13',
    1965: '02-02', 1966: '01-21', 1967: '02-09', 1968: '01-30', 1969: '02-17',
    1970: '02-06', 1971: '01-27', 1972: '02-15', 1973: '02-03', 1974: '01-23',
    1975: '02-11', 1976: '01-31', 1977: '02-18', 1978: '02-07', 1979: '01-28',
    1980: '02-16', 1981: '02-05', 1982: '01-25', 1983: '02-13', 1984: '02-02',
    1985: '02-20', 1986: '02-09', 1987: '01-29', 1988: '02-17', 1989: '02-06',
    1990: '01-27', 1991: '02-15', 1992: '02-04', 1993: '01-23', 1994: '02-10',
    1995: '01-31', 1996: '02-19', 1997: '02-07', 1998: '01-28', 1999: '02-16',
    2000: '02-05', 2001: '01-24', 2002: '02-12', 2003: '02-01', 2004: '01-22',
    2005: '02-09', 2006: '01-29', 2007: '02-18', 2008: '02-07', 2009: '01-26',
    2010: '02-14', 2011: '02-03', 2012: '01-23', 2013: '02-10', 2014: '01-31',
    2015: '02-19', 2016: '02-08', 2017: '01-28', 2018: '02-16', 2019: '02-05',
    2020: '01-25', 2021: '02-12', 2022: '02-01', 2023: '01-22', 2024: '02-10',
    2025: '01-29', 2026: '02-17', 2027: '02-06', 2028: '01-26', 2029: '02-13',
    2030: '02-03', 2031: '01-23', 2032: '02-11', 2033: '01-31', 2034: '02-19',
    2035: '02-08', 2036: '01-28', 2037: '02-15', 2038: '02-04', 2039: '01-24',
    2040: '02-12',
};