/* eslint-disable jsx-a11y/alt-text */
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import Dropdown from 'react-bootstrap/Dropdown'
import { fetchApi } from "../../services/api";
import md5 from "md5";
import { Button, Modal } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import Form from 'react-bootstrap/Form'
import './style.css';
import BaseSelect from "react-select";
import FixRequiredSelect from "./FixRequiredSelect";
import { signout } from '../../auth/index';

// const options = [
//   { value: 1, label: "1 - One" },
//   { value: 2, label: "2 - Two" },
//   { value: 3, label: "3 - Three" }
// ];


const options = [
  { value: '1', label: 'Andaman & Nicobar' },
  { value: '2', label: 'Andhra Pradesh' },
  { value: '3', label: 'Arunachal Pradesh' },
  { value: '4', label: 'Assam' },
  { value: '5', label: 'Bihar' },
  { value: '6', label: 'Chandigarh' },
  { value: '7', label: 'Chhattisgarh' },
  { value: '8', label: 'Dadra & Nagar Haveli' },
  { value: '9', label: 'Daman & Diu' },
  { value: '10', label: 'Delhi' },
  { value: '11', label: 'Goa' },
  { value: '12', label: 'Gujarat' },
  { value: '13', label: 'Haryana' },
  { value: '14', label: 'Himachal Pradesh' },
  { value: '15', label: 'Jammu & Kashmir' },
  { value: '16', label: 'Jharkhand' },
  { value: '17', label: 'Karnataka' },
  { value: '18', label: 'Kerala' },
  { value: '19', label: 'Lakshadweep' },
  { value: '20', label: 'Madhya Pradesh' },
  { value: '21', label: 'Maharashtra' },
  { value: '22', label: 'Manipur' },
  { value: '23', label: 'Meghalaya' },
  { value: '24', label: 'Mizoram' },
  { value: '25', label: 'Nagaland' },
  { value: '26', label: 'Orissa' },
  { value: '27', label: 'Pondicherry' },
  { value: '28', label: 'Punjab' },
  { value: '29', label: 'Rajasthan' },
  { value: '30', label: 'Sikkim' },
  { value: '31', label: 'Tamil Nadu' },
  { value: '32', label: 'Tripura' },
  { value: '33', label: 'Uttar Pradesh' },
  { value: '34', label: 'Uttaranchal' },
  { value: '35', label: 'West Bengal' },
];
const Select = props => (
  <FixRequiredSelect
    {...props}
    SelectComponent={BaseSelect}
    options={props.options || []}
  />
);
const MyAccount = ({ location }) => {

  const { addToast } = useToasts();
  const[seconds,setseconds]=useState(0)

  useEffect(() => {
    if(seconds===0)
    {
      return
    }
    const intervalId = setInterval(() => {
      setseconds(seconds - 1);
    }, 1000);
    return () => clearInterval(intervalId);
    }, [seconds]);
  const { pathname } = location;
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
  const [show, setShow] = useState(false);
  const [file, Setfile] = useState("")
  const handleClose = () => setShow(false);
  const [dismiss, setDismiss] = useState(true);
  const [mobileSignup, setMonileSignup] = useState({
    MobileNumber: '',
    CountryCode: '+91',
  });
  const [error22, setError22] = useState('');
  const [optioncity, setoptioncity] = useState([])
  const [otp, setOtp] = useState(false);
  const [send, setSend] = useState(false);
  const [timeCount, setTimeCount] = useState(false);
  const [passwordHide, setPasswordHide] = useState(true);
  const [passwordHide1, setPasswordHide1] = useState(true);
  const [passwordHide2, setPasswordHide2] = useState(true);
  var s_a = new Array();
  s_a[0] = "";
  s_a[1] = " Alipur | Andaman Island | Anderson Island | Arainj-Laka-Punga | Austinabad | Bamboo Flat | Barren Island | Beadonabad | Betapur | Bindraban | Bonington | Brookesabad | Cadell Point | Calicut | Chetamale | Cinque Islands | Defence Island | Digilpur | Dolyganj | Flat Island | Geinyale | Great Coco Island | Haddo | Havelock Island | Henry Lawrence Island | Herbertabad | Hobdaypur | Ilichar | Ingoie | Inteview Island | Jangli Ghat | Jhon Lawrence Island | Karen | Kartara | KYD Islannd | Landfall Island | Little Andmand | Little Coco Island | Long Island | Maimyo | Malappuram | Manglutan | Manpur | Mitha Khari | Neill Island | Nicobar Island | North Brother Island | North Passage Island | North Sentinel Island | Nothen Reef Island | Outram Island | Pahlagaon | Palalankwe | Passage Island | Phaiapong | Phoenix Island | Port Blair | Preparis Island | Protheroepur | Rangachang | Rongat | Rutland Island | Sabari | Saddle Peak | Shadipur | Smith Island | Sound Island | South Sentinel Island | Spike Island | Tarmugli Island | Taylerabad | Titaije | Toibalawe | Tusonabad | West Island | Wimberleyganj | Yadita";
  s_a[2] = " Achampet | Adilabad | Adoni | Alampur | Allagadda | Alur | Amalapuram | Amangallu | Anakapalle | Anantapur | Andole | Araku | Armoor | Asifabad | Aswaraopet | Atmakur | B. Kothakota | Badvel | Banaganapalle | Bandar | Bangarupalem | Banswada | Bapatla | Bellampalli | Bhadrachalam | Bhainsa | Bheemunipatnam | Bhimadole | Bhimavaram | Bhongir | Bhooragamphad | Boath | Bobbili | Bodhan | Chandoor | Chavitidibbalu | Chejerla | Chepurupalli | Cherial | Chevella | Chinnor | Chintalapudi | Chintapalle | Chirala | Chittoor | Chodavaram | Cuddapah | Cumbum | Darsi | Devarakonda | Dharmavaram | Dichpalli | Divi | Donakonda | Dronachalam | East Godavari | Eluru | Eturnagaram | Gadwal | Gajapathinagaram | Gajwel | Garladinne | Giddalur | Godavari | Gooty | Gudivada | Gudur | Guntur | Hindupur | Hunsabad | Huzurabad | Huzurnagar | Hyderabad | Ibrahimpatnam | Jaggayyapet | Jagtial | Jammalamadugu | Jangaon | Jangareddygudem | Jannaram | Kadiri | Kaikaluru | Kakinada | Kalwakurthy | Kalyandurg | Kamalapuram | Kamareddy | Kambadur | Kanaganapalle | Kandukuru | Kanigiri | Karimnagar | Kavali | Khammam | Khanapur (AP) | Kodangal | Koduru | Koilkuntla | Kollapur | Kothagudem | Kovvur | Krishna | Krosuru | Kuppam | Kurnool | Lakkireddipalli | Madakasira | Madanapalli | Madhira | Madnur | Mahabubabad | Mahabubnagar | Mahadevapur | Makthal | Mancherial | Mandapeta | Mangalagiri | Manthani | Markapur | Marturu | Medachal | Medak | Medarmetla | Metpalli | Mriyalguda | Mulug | Mylavaram | Nagarkurnool | Nalgonda | Nallacheruvu | Nampalle | Nandigama | Nandikotkur | Nandyal | Narasampet | Narasaraopet | Narayanakhed | Narayanpet | Narsapur | Narsipatnam | Nazvidu | Nelloe | Nellore | Nidamanur | Nirmal | Nizamabad | Nuguru | Ongole | Outsarangapalle | Paderu | Pakala | Palakonda | Paland | Palmaneru | Pamuru | Pargi | Parkal | Parvathipuram | Pathapatnam | Pattikonda | Peapalle | Peddapalli | Peddapuram | Penukonda | Piduguralla | Piler | Pithapuram | Podili | Polavaram | Prakasam | Proddatur | Pulivendla | Punganur | Putturu | Rajahmundri | Rajampeta | Ramachandrapuram | Ramannapet | Rampachodavaram | Rangareddy | Rapur | Rayachoti | Rayadurg | Razole | Repalle | Saluru | Sangareddy | Sathupalli | Sattenapalle | Satyavedu | Shadnagar | Siddavattam | Siddipet | Sileru | Sircilla | Sirpur Kagaznagar | Sodam | Sompeta | Srikakulam | Srikalahasthi | Srisailam | Srungavarapukota | Sudhimalla | Sullarpet | Tadepalligudem | Tadipatri | Tanduru | Tanuku | Tekkali | Tenali | Thungaturthy | Tirivuru | Tirupathi | Tuni | Udaygiri | Ulvapadu | Uravakonda | Utnor | V.R. Puram | Vaimpalli | Vayalpad | Venkatgiri | Venkatgirikota | Vijayawada | Vikrabad | Vinjamuru | Vinukonda | Visakhapatnam | Vizayanagaram | Vizianagaram | Vuyyuru | Wanaparthy | Warangal | Wardhannapet | Yelamanchili | Yelavaram | Yeleswaram | Yellandu | Yellanuru | Yellareddy | Yerragondapalem | Zahirabad ";
  s_a[3] = " Along | Anini | Anjaw | Bameng | Basar | Changlang | Chowkhem | Daporizo | Dibang Valley | Dirang | Hayuliang | Huri | Itanagar | Jairampur | Kalaktung | Kameng | Khonsa | Kolaring | Kurung Kumey | Lohit | Lower Dibang Valley | Lower Subansiri | Mariyang | Mechuka | Miao | Nefra | Pakkekesang | Pangin | Papum Pare | Passighat | Roing | Sagalee | Seppa | Siang | Tali | Taliha | Tawang | Tezu | Tirap | Tuting | Upper Siang | Upper Subansiri | Yiang Kiag ";
  s_a[4] = " Abhayapuri | Baithalangshu | Barama | Barpeta Road | Bihupuria | Bijni | Bilasipara | Bokajan | Bokakhat | Boko | Bongaigaon | Cachar | Cachar Hills | Darrang | Dhakuakhana | Dhemaji | Dhubri | Dibrugarh | Digboi | Diphu | Goalpara | Gohpur | Golaghat | Guwahati | Hailakandi | Hajo | Halflong | Hojai | Howraghat | Jorhat | Kamrup | Karbi Anglong | Karimganj | Kokarajhar | Kokrajhar | Lakhimpur | Maibong | Majuli | Mangaldoi | Mariani | Marigaon | Moranhat | Morigaon | Nagaon | Nalbari | Rangapara | Sadiya | Sibsagar | Silchar | Sivasagar | Sonitpur | Tarabarihat | Tezpur | Tinsukia | Udalgiri | Udalguri | UdarbondhBarpeta";
  s_a[5] = " Adhaura | Amarpur | Araria | Areraj | Arrah | Arwal | Aurangabad | Bagaha | Banka | Banmankhi | Barachakia | Barauni | Barh | Barosi | Begusarai | Benipatti | Benipur | Bettiah | Bhabhua | Bhagalpur | Bhojpur | Bidupur | Biharsharif | Bikram | Bikramganj | Birpur | Buxar | Chakai | Champaran | Chapara | Dalsinghsarai | Danapur | Darbhanga | Daudnagar | Dhaka | Dhamdaha | Dumraon | Ekma | Forbesganj | Gaya | Gogri | Gopalganj | H.Kharagpur | Hajipur | Hathua | Hilsa | Imamganj | Jahanabad | Jainagar | Jamshedpur | Jamui | Jehanabad | Jhajha | Jhanjharpur | Kahalgaon | Kaimur (Bhabua) | Katihar | Katoria | Khagaria | Kishanganj | Korha | Lakhisarai | Madhepura | Madhubani | Maharajganj | Mahua | Mairwa | Mallehpur | Masrakh | Mohania | Monghyr | Motihari | Motipur | Munger | Muzaffarpur | Nabinagar | Nalanda | Narkatiaganj | Naugachia | Nawada | Pakribarwan | Pakridayal | Patna | Phulparas | Piro | Pupri | Purena | Purnia | Rafiganj | Rajauli | Ramnagar | Raniganj | Raxaul | Rohtas | Rosera | S.Bakhtiarpur | Saharsa | Samastipur | Saran | Sasaram | Seikhpura | Sheikhpura | Sheohar | Sherghati | Sidhawalia | Singhwara | Sitamarhi | Siwan | Sonepur | Supaul | Thakurganj | Triveniganj | Udakishanganj | Vaishali | Wazirganj";
  s_a[6] = " Chandigarh | Mani Marja";
  s_a[7] = " Ambikapur | Antagarh | Arang | Bacheli | Bagbahera | Bagicha | Baikunthpur | Balod | Balodabazar | Balrampur | Barpalli | Basana | Bastanar | Bastar | Bderajpur | Bemetara | Berla | Bhairongarh | Bhanupratappur | Bharathpur | Bhatapara | Bhilai | Bhilaigarh | Bhopalpatnam | Bijapur | Bilaspur | Bodla | Bokaband | Chandipara | Chhinagarh | Chhuriakala | Chingmut | Chuikhadan | Dabhara | Dallirajhara | Dantewada | Deobhog | Dhamda | Dhamtari | Dharamjaigarh | Dongargarh | Durg | Durgakondal | Fingeshwar | Gariaband | Garpa | Gharghoda | Gogunda | Ilamidi | Jagdalpur | Janjgir | Janjgir-Champa | Jarwa | Jashpur | Jashpurnagar | Kabirdham-Kawardha | Kanker | Kasdol | Kathdol | Kathghora | Kawardha | Keskal | Khairgarh | Kondagaon | Konta | Korba | Korea | Kota | Koyelibeda | Kuakunda | Kunkuri | Kurud | Lohadigundah | Lormi | Luckwada | Mahasamund | Makodi | Manendragarh | Manpur | Marwahi | Mohla | Mungeli | Nagri | Narainpur | Narayanpur | Neora | Netanar | Odgi | Padamkot | Pakhanjur | Pali | Pandaria | Pandishankar | Parasgaon | Pasan | Patan | Pathalgaon | Pendra | Pratappur | Premnagar | Raigarh | Raipur | Rajnandgaon | Rajpur | Ramchandrapur | Saraipali | Saranggarh | Sarona | Semaria | Shakti | Sitapur | Sukma | Surajpur | Surguja | Tapkara | Toynar | Udaipur | Uproda | Wadrainagar";
  s_a[8] = " Amal | Amli | Bedpa | Chikhli | Dadra & Nagar Haveli | Dahikhed | Dolara | Galonda | Kanadi | Karchond | Khadoli | Kharadpada | Kherabari | Kherdi | Kothar | Luari | Mashat | Rakholi | Rudana | Saili | Sili | Silvassa | Sindavni | Udva | Umbarkoi | Vansda | Vasona | Velugam ";
  s_a[9] = " Brancavare | Dagasi | Daman | Diu | Magarvara | Nagwa | Pariali | Passo Covo ";
  s_a[10] = " Central Delhi | East Delhi | New Delhi | North Delhi | North East Delhi | North West Delhi | South Delhi | South West Delhi | West Delhi ";
  s_a[11] = " Canacona | Candolim | Chinchinim | Cortalim | Goa | Jua | Madgaon | Mahem | Mapuca | Marmagao | Panji | Ponda | Sanvordem | Terekhol ";
  s_a[12] = " Ahmedabad | Ahwa | Amod | Amreli | Anand | Anjar | Ankaleshwar | Babra | Balasinor | Banaskantha | Bansada | Bardoli | Bareja | Baroda | Barwala | Bayad | Bhachav | Bhanvad | Bharuch | Bhavnagar | Bhiloda | Bhuj | Billimora | Borsad | Botad | Chanasma | Chhota Udaipur | Chotila | Dabhoi | Dahod | Damnagar | Dang | Danta | Dasada | Dediapada | Deesa | Dehgam | Deodar | Devgadhbaria | Dhandhuka | Dhanera | Dharampur | Dhari | Dholka | Dhoraji | Dhrangadhra | Dhrol | Dwarka | Fortsongadh | Gadhada | Gandhi Nagar | Gariadhar | Godhra | Gogodar | Gondal | Halol | Halvad | Harij | Himatnagar | Idar | Jambusar | Jamjodhpur | Jamkalyanpur | Jamnagar | Jasdan | Jetpur | Jhagadia | Jhalod | Jodia | Junagadh | Junagarh | Kalawad | Kalol | Kapad Wanj | Keshod | Khambat | Khambhalia | Khavda | Kheda | Khedbrahma | Kheralu | Kodinar | Kotdasanghani | Kunkawav | Kutch | Kutchmandvi | Kutiyana | Lakhpat | Lakhtar | Lalpur | Limbdi | Limkheda | Lunavada | M.M.Mangrol | Mahuva | Malia-Hatina | Maliya | Malpur | Manavadar | Mandvi | Mangrol | Mehmedabad | Mehsana | Miyagam | Modasa | Morvi | Muli | Mundra | Nadiad | Nakhatrana | Nalia | Narmada | Naswadi | Navasari | Nizar | Okha | Paddhari | Padra | Palanpur | Palitana | Panchmahals | Patan | Pavijetpur | Porbandar | Prantij | Radhanpur | Rahpar | Rajaula | Rajkot | Rajpipla | Ranavav | Sabarkantha | Sanand | Sankheda | Santalpur | Santrampur | Savarkundla | Savli | Sayan | Sayla | Shehra | Sidhpur | Sihor | Sojitra | Sumrasar | Surat | Surendranagar | Talaja | Thara | Tharad | Thasra | Una-Diu | Upleta | Vadgam | Vadodara | Valia | Vallabhipur | Valod | Valsad | Vanthali | Vapi | Vav | Veraval | Vijapur | Viramgam | Visavadar | Visnagar | Vyara | Waghodia | Wankaner ";
  s_a[13] = " Adampur Mandi | Ambala | Assandh | Bahadurgarh | Barara | Barwala | Bawal | Bawanikhera | Bhiwani | Charkhidadri | Cheeka | Chhachrauli | Dabwali | Ellenabad | Faridabad | Fatehabad | Ferojpur Jhirka | Gharaunda | Gohana | Gurgaon | Hansi | Hisar | Jagadhari | Jatusana | Jhajjar | Jind | Julana | Kaithal | Kalanaur | Kalanwali | Kalka | Karnal | Kosli | Kurukshetra | Loharu | Mahendragarh | Meham | Mewat | Mohindergarh | Naraingarh | Narnaul | Narwana | Nilokheri | Nuh | Palwal | Panchkula | Panipat | Pehowa | Ratia | Rewari | Rohtak | Safidon | Sirsa | Siwani | Sonipat | Tohana | Tohsam | Yamunanagar ";
  s_a[14] = " Amb | Arki | Banjar | Bharmour | Bilaspur | Chamba | Churah | Dalhousie | Dehra Gopipur | Hamirpur | Jogindernagar | Kalpa | Kangra | Kinnaur | Kullu | Lahaul | Mandi | Nahan | Nalagarh | Nirmand | Nurpur | Palampur | Pangi | Paonta | Pooh | Rajgarh | Rampur Bushahar | Rohru | Shimla | Sirmaur | Solan | Spiti | Sundernagar | Theog | Udaipur | Una";
  s_a[15] = " Akhnoor | Anantnag | Badgam | Bandipur | Baramulla | Basholi | Bedarwah | Budgam | Doda | Gulmarg | Jammu | Kalakot | Kargil | Karnah | Kathua | Kishtwar | Kulgam | Kupwara | Leh | Mahore | Nagrota | Nobra | Nowshera | Nyoma | Padam | Pahalgam | Patnitop | Poonch | Pulwama | Rajouri | Ramban | Ramnagar | Reasi | Samba | Srinagar | Udhampur | Vaishno Devi ";
  s_a[16] = " Bagodar | Baharagora | Balumath | Barhi | Barkagaon | Barwadih | Basia | Bermo | Bhandaria | Bhawanathpur | Bishrampur | Bokaro | Bolwa | Bundu | Chaibasa | Chainpur | Chakardharpur | Chandil | Chatra | Chavparan | Daltonganj | Deoghar | Dhanbad | Dumka | Dumri | Garhwa | Garu | Ghaghra | Ghatsila | Giridih | Godda | Gomia | Govindpur | Gumla | Hazaribagh | Hunterganj | Ichak | Itki | Jagarnathpur | Jamshedpur | Jamtara | Japla | Jharmundi | Jhinkpani | Jhumaritalaiya | Kathikund | Kharsawa | Khunti | Koderma | Kolebira | Latehar | Lohardaga | Madhupur | Mahagama | Maheshpur Raj | Mandar | Mandu | Manoharpur | Muri | Nagarutatri | Nala | Noamundi | Pakur | Palamu | Palkot | Patan | Rajdhanwar | Rajmahal | Ramgarh | Ranchi | Sahibganj | Saraikela | Simaria | Simdega | Singhbhum | Tisri | Torpa ";
  s_a[17] = " Afzalpur | Ainapur | Aland | Alur | Anekal | Ankola | Arsikere | Athani | Aurad | Bableshwar | Badami | Bagalkot | Bagepalli | Bailhongal | Bangalore | Bangalore Rural | Bangarpet | Bantwal | Basavakalyan | Basavanabagewadi | Basavapatna | Belgaum | Bellary | Belthangady | Belur | Bhadravati | Bhalki | Bhatkal | Bidar | Bijapur | Biligi | Chadchan | Challakere | Chamrajnagar | Channagiri | Channapatna | Channarayapatna | Chickmagalur | Chikballapur | Chikkaballapur | Chikkanayakanahalli | Chikkodi | Chikmagalur | Chincholi | Chintamani | Chitradurga | Chittapur | Cowdahalli | Davanagere | Deodurga | Devangere | Devarahippargi | Dharwad | Doddaballapur | Gadag | Gangavathi | Gokak | Gowribdanpur | Gubbi | Gulbarga | Gundlupet | H.B.Halli | H.D. Kote | Haliyal | Hampi | Hangal | Harapanahalli | Hassan | Haveri | Hebri | Hirekerur | Hiriyur | Holalkere | Holenarsipur | Honnali | Honnavar | Hosadurga | Hosakote | Hosanagara | Hospet | Hubli | Hukkeri | Humnabad | Hungund | Hunsagi | Hunsur | Huvinahadagali | Indi | Jagalur | Jamkhandi | Jewargi | Joida | K.R. Nagar | Kadur | Kalghatagi | Kamalapur | Kanakapura | Kannada | Kargal | Karkala | Karwar | Khanapur | Kodagu | Kolar | Kollegal | Koppa | Koppal | Koratageri | Krishnarajapet | Kudligi | Kumta | Kundapur | Kundgol | Kunigal | Kurugodu | Kustagi | Lingsugur | Madikeri | Madugiri | Malavalli | Malur | Mandya | Mangalore | Manipal | Manvi | Mashal | Molkalmuru | Mudalgi | Muddebihal | Mudhol | Mudigere | Mulbagal | Mundagod | Mundargi | Murugod | Mysore | Nagamangala | Nanjangud | Nargund | Narsimrajapur | Navalgund | Nelamangala | Nimburga | Pandavapura | Pavagada | Puttur | Raibag | Raichur | Ramdurg | Ranebennur | Ron | Sagar | Sakleshpur | Salkani | Sandur | Saundatti | Savanur | Sedam | Shahapur | Shankarnarayana | Shikaripura | Shimoga | Shirahatti | Shorapur | Siddapur | Sidlaghatta | Sindagi | Sindhanur | Sira | Sirsi | Siruguppa | Somwarpet | Sorab | Sringeri | Sriniwaspur | Srirangapatna | Sullia | T. Narsipur | Tallak | Tarikere | Telgi | Thirthahalli | Tiptur | Tumkur | Turuvekere | Udupi | Virajpet | Wadi | Yadgiri | Yelburga | Yellapur ";
  s_a[18] = " Adimaly | Adoor | Agathy | Alappuzha | Alathur | Alleppey | Alwaye | Amini | Androth | Attingal | Badagara | Bitra | Calicut | Cannanore | Chetlet | Ernakulam | Idukki | Irinjalakuda | Kadamath | Kalpeni | Kalpetta | Kanhangad | Kanjirapally | Kannur | Karungapally | Kasargode | Kavarathy | Kiltan | Kochi | Koduvayur | Kollam | Kottayam | Kovalam | Kozhikode | Kunnamkulam | Malappuram | Mananthodi | Manjeri | Mannarghat | Mavelikkara | Minicoy | Munnar | Muvattupuzha | Nedumandad | Nedumgandam | Nilambur | Palai | Palakkad | Palghat | Pathaanamthitta | Pathanamthitta | Payyanur | Peermedu | Perinthalmanna | Perumbavoor | Punalur | Quilon | Ranni | Shertallai | Shoranur | Taliparamba | Tellicherry | Thiruvananthapuram | Thodupuzha | Thrissur | Tirur | Tiruvalla | Trichur | Trivandrum | Uppala | Vadakkanchery | Vikom | Wayanad ";
  s_a[19] = " Agatti Island | Bingaram Island | Bitra Island | Chetlat Island | Kadmat Island | Kalpeni Island | Kavaratti Island | Kiltan Island | Lakshadweep Sea | Minicoy Island | North Island | South Island ";
  s_a[20] = " Agar | Ajaigarh | Alirajpur | Amarpatan | Amarwada | Ambah | Anuppur | Arone | Ashoknagar | Ashta | Atner | Babaichichli | Badamalhera | Badarwsas | Badnagar | Badnawar | Badwani | Bagli | Baihar | Balaghat | Baldeogarh | Baldi | Bamori | Banda | Bandhavgarh | Bareli | Baroda | Barwaha | Barwani | Batkakhapa | Begamganj | Beohari | Berasia | Berchha | Betul | Bhainsdehi | Bhander | Bhanpura | Bhikangaon | Bhimpur | Bhind | Bhitarwar | Bhopal | Biaora | Bijadandi | Bijawar | Bijaypur | Bina | Birsa | Birsinghpur | Budhni | Burhanpur | Buxwaha | Chachaura | Chanderi | Chaurai | Chhapara | Chhatarpur | Chhindwara | Chicholi | Chitrangi | Churhat | Dabra | Damoh | Datia | Deori | Deosar | Depalpur | Dewas | Dhar | Dharampuri | Dindori | Gadarwara | Gairatganj | Ganjbasoda | Garoth | Ghansour | Ghatia | Ghatigaon | Ghorandogri | Ghughari | Gogaon | Gohad | Goharganj | Gopalganj | Gotegaon | Gourihar | Guna | Gunnore | Gwalior | Gyraspur | Hanumana | Harda | Harrai | Harsud | Hatta | Hoshangabad | Ichhawar | Indore | Isagarh | Itarsi | Jabalpur | Jabera | Jagdalpur | Jaisinghnagar | Jaithari | Jaitpur | Jaitwara | Jamai | Jaora | Jatara | Jawad | Jhabua | Jobat | Jora | Kakaiya | Kannod | Kannodi | Karanjia | Kareli | Karera | Karhal | Karpa | Kasrawad | Katangi | Katni | Keolari | Khachrod | Khajuraho | Khakner | Khalwa | Khandwa | Khaniadhana | Khargone | Khategaon | Khetia | Khilchipur | Khirkiya | Khurai | Kolaras | Kotma | Kukshi | Kundam | Kurwai | Kusmi | Laher | Lakhnadon | Lamta | Lanji | Lateri | Laundi | Maheshwar | Mahidpurcity | Maihar | Majhagwan | Majholi | Malhargarh | Manasa | Manawar | Mandla | Mandsaur | Manpur | Mauganj | Mawai | Mehgaon | Mhow | Morena | Multai | Mungaoli | Nagod | Nainpur | Narsingarh | Narsinghpur | Narwar | Nasrullaganj | Nateran | Neemuch | Niwari | Niwas | Nowgaon | Pachmarhi | Pandhana | Pandhurna | Panna | Parasia | Patan | Patera | Patharia | Pawai | Petlawad | Pichhore | Piparia | Pohari | Prabhapattan | Punasa | Pushprajgarh | Raghogarh | Raghunathpur | Rahatgarh | Raisen | Rajgarh | Rajpur | Ratlam | Rehli | Rewa | Sabalgarh | Sagar | Sailana | Sanwer | Sarangpur | Sardarpur | Satna | Saunsar | Sehore | Sendhwa | Seondha | Seoni | Seonimalwa | Shahdol | Shahnagar | Shahpur | Shajapur | Sheopur | Sheopurkalan | Shivpuri | Shujalpur | Sidhi | Sihora | Silwani | Singrauli | Sirmour | Sironj | Sitamau | Sohagpur | Sondhwa | Sonkatch | Susner | Tamia | Tarana | Tendukheda | Teonthar | Thandla | Tikamgarh | Timarani | Udaipura | Ujjain | Umaria | Umariapan | Vidisha | Vijayraghogarh | Waraseoni | Zhirnia ";
  s_a[21] = " Achalpur | Aheri | Ahmednagar | Ahmedpur | Ajara | Akkalkot | Akola | Akole | Akot | Alibagh | Amagaon | Amalner | Ambad | Ambejogai | Amravati | Arjuni Merogaon | Arvi | Ashti | Atpadi | Aurangabad | Ausa | Babhulgaon | Balapur | Baramati | Barshi Takli | Barsi | Basmatnagar | Bassein | Beed | Bhadrawati | Bhamregadh | Bhandara | Bhir | Bhiwandi | Bhiwapur | Bhokar | Bhokardan | Bhoom | Bhor | Bhudargad | Bhusawal | Billoli | Brahmapuri | Buldhana | Butibori | Chalisgaon | Chamorshi | Chandgad | Chandrapur | Chandur | Chanwad | Chhikaldara | Chikhali | Chinchwad | Chiplun | Chopda | Chumur | Dahanu | Dapoli | Darwaha | Daryapur | Daund | Degloor | Delhi Tanda | Deogad | Deolgaonraja | Deori | Desaiganj | Dhadgaon | Dhanora | Dharani | Dhiwadi | Dhule | Dhulia | Digras | Dindori | Edalabad | Erandul | Etapalli | Gadhchiroli | Gadhinglaj | Gaganbavada | Gangakhed | Gangapur | Gevrai | Ghatanji | Golegaon | Gondia | Gondpipri | Goregaon | Guhagar | Hadgaon | Hatkangale | Hinganghat | Hingoli | Hingua | Igatpuri | Indapur | Islampur | Jalgaon | Jalna | Jamkhed | Jamner | Jath | Jawahar | Jintdor | Junnar | Kagal | Kaij | Kalamb | Kalamnuri | Kallam | Kalmeshwar | Kalwan | Kalyan | Kamptee | Kandhar | Kankavali | Kannad | Karad | Karjat | Karmala | Katol | Kavathemankal | Kedgaon | Khadakwasala | Khamgaon | Khed | Khopoli | Khultabad | Kinwat | Kolhapur | Kopargaon | Koregaon | Kudal | Kuhi | Kurkheda | Kusumba | Lakhandur | Langa | Latur | Lonar | Lonavala | Madangad | Madha | Mahabaleshwar | Mahad | Mahagaon | Mahasala | Mahaswad | Malegaon | Malgaon | Malgund | Malkapur | Malsuras | Malwan | Mancher | Mangalwedha | Mangaon | Mangrulpur | Manjalegaon | Manmad | Maregaon | Mehda | Mekhar | Mohadi | Mohol | Mokhada | Morshi | Mouda | Mukhed | Mul | Mumbai | Murbad | Murtizapur | Murud | Nagbhir | Nagpur | Nahavara | Nanded | Nandgaon | Nandnva | Nandurbar | Narkhed | Nashik | Navapur | Ner | Newasa | Nilanga | Niphad | Omerga | Osmanabad | Pachora | Paithan | Palghar | Pali | Pandharkawada | Pandharpur | Panhala | Paranda | Parbhani | Parner | Parola | Parseoni | Partur | Patan | Pathardi | Pathari | Patoda | Pauni | Peint | Pen | Phaltan | Pimpalner | Pirangut | Poladpur | Pune | Pusad | Pusegaon | Radhanagar | Rahuri | Raigad | Rajapur | Rajgurunagar | Rajura | Ralegaon | Ramtek | Ratnagiri | Raver | Risod | Roha | Sakarwadi | Sakoli | Sakri | Salekasa | Samudrapur | Sangamner | Sanganeshwar | Sangli | Sangola | Sanguem | Saoner | Saswad | Satana | Satara | Sawantwadi | Seloo | Shahada | Shahapur | Shahuwadi | Shevgaon | Shirala | Shirol | Shirpur | Shirur | Shirwal | Sholapur | Shri Rampur | Shrigonda | Shrivardhan | Sillod | Sinderwahi | Sindhudurg | Sindkheda | Sindkhedaraja | Sinnar | Sironcha | Soyegaon | Surgena | Talasari | Talegaon S.Ji Pant | Taloda | Tasgaon | Thane | Tirora | Tiwasa | Trimbak | Tuljapur | Tumsar | Udgir | Umarkhed | Umrane | Umrer | Urlikanchan | Vaduj | Velhe | Vengurla | Vijapur | Vita | Wada | Wai | Walchandnagar | Wani | Wardha | Warlydwarud | Warora | Washim | Wathar | Yavatmal | Yawal | Yeola | Yeotmal ";
  s_a[22] = " Bishnupur | Chakpikarong | Chandel | Chattrik | Churachandpur | Imphal | Jiribam | Kakching | Kalapahar | Mao | Mulam | Parbung | Sadarhills | Saibom | Sempang | Senapati | Sochumer | Taloulong | Tamenglong | Thinghat | Thoubal | Ukhrul ";
  s_a[23] = " Amlaren | Baghmara | Cherrapunjee | Dadengiri | Garo Hills | Jaintia Hills | Jowai | Khasi Hills | Khliehriat | Mariang | Mawkyrwat | Nongpoh | Nongstoin | Resubelpara | Ri Bhoi | Shillong | Tura | Williamnagar";
  s_a[24] = " Aizawl | Champhai | Demagiri | Kolasib | Lawngtlai | Lunglei | Mamit | Saiha | Serchhip";
  s_a[25] = " Dimapur | Jalukie | Kiphire | Kohima | Mokokchung | Mon | Phek | Tuensang | Wokha | Zunheboto ";
  s_a[26] = " Anandapur | Angul | Anugul | Aska | Athgarh | Athmallik | Attabira | Bagdihi | Balangir | Balasore | Baleswar | Baliguda | Balugaon | Banaigarh | Bangiriposi | Barbil | Bargarh | Baripada | Barkot | Basta | Berhampur | Betanati | Bhadrak | Bhanjanagar | Bhawanipatna | Bhubaneswar | Birmaharajpur | Bisam Cuttack | Boriguma | Boudh | Buguda | Chandbali | Chhatrapur | Chhendipada | Cuttack | Daringbadi | Daspalla | Deodgarh | Deogarh | Dhanmandal | Dharamgarh | Dhenkanal | Digapahandi | Dunguripali | G. Udayagiri | Gajapati | Ganjam | Ghatgaon | Gudari | Gunupur | Hemgiri | Hindol | Jagatsinghapur | Jajpur | Jamankira | Jashipur | Jayapatna | Jeypur | Jharigan | Jharsuguda | Jujumura | Kalahandi | Kalimela | Kamakhyanagar | Kandhamal | Kantabhanji | Kantamal | Karanjia | Kashipur | Kendrapara | Kendujhar | Keonjhar | Khalikote | Khordha | Khurda | Komana | Koraput | Kotagarh | Kuchinda | Lahunipara | Laxmipur | M. Rampur | Malkangiri | Mathili | Mayurbhanj | Mohana | Motu | Nabarangapur | Naktideul | Nandapur | Narlaroad | Narsinghpur | Nayagarh | Nimapara | Nowparatan | Nowrangapur | Nuapada | Padampur | Paikamal | Palla Hara | Papadhandi | Parajang | Pardip | Parlakhemundi | Patnagarh | Pattamundai | Phiringia | Phulbani | Puri | Puruna Katak | R. Udayigiri | Rairakhol | Rairangpur | Rajgangpur | Rajkhariar | Rayagada | Rourkela | Sambalpur | Sohela | Sonapur | Soro | Subarnapur | Sunabeda | Sundergarh | Surada | T. Rampur | Talcher | Telkoi | Titlagarh | Tumudibandha | Udala | Umerkote ";
  s_a[27] = " Bahur | Karaikal | Mahe | Pondicherry | Purnankuppam | Valudavur | Villianur | Yanam ";
  s_a[28] = " Abohar | Ajnala | Amritsar | Balachaur | Barnala | Batala | Bathinda | Chandigarh | Dasua | Dinanagar | Faridkot | Fatehgarh Sahib | Fazilka | Ferozepur | Garhashanker | Goindwal | Gurdaspur | Guruharsahai | Hoshiarpur | Jagraon | Jalandhar | Jugial | Kapurthala | Kharar | Kotkapura | Ludhiana | Malaut | Malerkotla | Mansa | Moga | Muktasar | Nabha | Nakodar | Nangal | Nawanshahar | Nawanshahr | Pathankot | Patiala | Patti | Phagwara | Phillaur | Phulmandi | Quadian | Rajpura | Raman | Rayya | Ropar | Rupnagar | Samana | Samrala | Sangrur | Sardulgarh | Sarhind | SAS Nagar | Sultanpur Lodhi | Sunam | Tanda Urmar | Tarn Taran | Zira ";
  s_a[29] = " Abu Road | Ahore | Ajmer | Aklera | Alwar | Amber | Amet | Anupgarh | Asind | Aspur | Atru | Bagidora | Bali | Bamanwas | Banera | Bansur | Banswara | Baran | Bari | Barisadri | Barmer | Baseri | Bassi | Baswa | Bayana | Beawar | Begun | Behror | Bhadra | Bharatpur | Bhilwara | Bhim | Bhinmal | Bikaner | Bilara | Bundi | Chhabra | Chhipaborad | Chirawa | Chittorgarh | Chohtan | Churu | Dantaramgarh | Dausa | Deedwana | Deeg | Degana | Deogarh | Deoli | Desuri | Dhariawad | Dholpur | Digod | Dudu | Dungarpur | Dungla | Fatehpur | Gangapur | Gangdhar | Gerhi | Ghatol | Girwa | Gogunda | Hanumangarh | Hindaun | Hindoli | Hurda | Jahazpur | Jaipur | Jaisalmer | Jalore | Jhalawar | Jhunjhunu | Jodhpur | Kaman | Kapasan | Karauli | Kekri | Keshoraipatan | Khandar | Kherwara | Khetri | Kishanganj | Kishangarh | Kishangarhbas | Kolayat | Kota | Kotputli | Kotra | Kotri | Kumbalgarh | Kushalgarh | Ladnun | Ladpura | Lalsot | Laxmangarh | Lunkaransar | Mahuwa | Malpura | Malvi | Mandal | Mandalgarh | Mandawar | Mangrol | Marwar-Jn | Merta | Nadbai | Nagaur | Nainwa | Nasirabad | Nathdwara | Nawa | Neem Ka Thana | Newai | Nimbahera | Nohar | Nokha | Onli | Osian | Pachpadara | Pachpahar | Padampur | Pali | Parbatsar | Phagi | Phalodi | Pilani | Pindwara | Pipalda | Pirawa | Pokaran | Pratapgarh | Raipur | Raisinghnagar | Rajgarh | Rajsamand | Ramganj Mandi | Ramgarh | Rashmi | Ratangarh | Reodar | Rupbas | Sadulshahar | Sagwara | Sahabad | Salumber | Sanchore | Sangaria | Sangod | Sapotra | Sarada | Sardarshahar | Sarwar | Sawai Madhopur | Shahapura | Sheo | Sheoganj | Shergarh | Sikar | Sirohi | Siwana | Sojat | Sri Dungargarh | Sri Ganganagar | Sri Karanpur | Sri Madhopur | Sujangarh | Taranagar | Thanaghazi | Tibbi | Tijara | Todaraisingh | Tonk | Udaipur | Udaipurwati | Uniayara | Vallabhnagar | Viratnagar ";
  s_a[30] = " Barmiak | Be | Bhurtuk | Chhubakha | Chidam | Chubha | Chumikteng | Dentam | Dikchu | Dzongri | Gangtok | Gauzing | Gyalshing | Hema | Kerung | Lachen | Lachung | Lema | Lingtam | Lungthu | Mangan | Namchi | Namthang | Nanga | Nantang | Naya Bazar | Padamachen | Pakhyong | Pemayangtse | Phensang | Rangli | Rinchingpong | Sakyong | Samdong | Singtam | Siniolchu | Sombari | Soreng | Sosing | Tekhug | Temi | Tsetang | Tsomgo | Tumlong | Yangang | Yumtang ";
  s_a[31] = " Ambasamudram | Anamali | Arakandanallur | Arantangi | Aravakurichi | Ariyalur | Arkonam | Arni | Aruppukottai | Attur | Avanashi | Batlagundu | Bhavani | Chengalpattu | Chengam | Chennai | Chidambaram | Chingleput | Coimbatore | Courtallam | Cuddalore | Cumbum | Denkanikoitah | Devakottai | Dharampuram | Dharmapuri | Dindigul | Erode | Gingee | Gobichettipalayam | Gudalur | Gudiyatham | Harur | Hosur | Jayamkondan | Kallkurichi | Kanchipuram | Kangayam | Kanyakumari | Karaikal | Karaikudi | Karur | Keeranur | Kodaikanal | Kodumudi | Kotagiri | Kovilpatti | Krishnagiri | Kulithalai | Kumbakonam | Kuzhithurai | Madurai | Madurantgam | Manamadurai | Manaparai | Mannargudi | Mayiladuthurai | Mayiladutjurai | Mettupalayam | Metturdam | Mudukulathur | Mulanur | Musiri | Nagapattinam | Nagarcoil | Namakkal | Nanguneri | Natham | Neyveli | Nilgiris | Oddanchatram | Omalpur | Ootacamund | Ooty | Orathanad | Palacode | Palani | Palladum | Papanasam | Paramakudi | Pattukottai | Perambalur | Perundurai | Pollachi | Polur | Pondicherry | Ponnamaravathi | Ponneri | Pudukkottai | Rajapalayam | Ramanathapuram | Rameshwaram | Ranipet | Rasipuram | Salem | Sankagiri | Sankaran | Sathiyamangalam | Sivaganga | Sivakasi | Sriperumpudur | Srivaikundam | Tenkasi | Thanjavur | Theni | Thirumanglam | Thiruraipoondi | Thoothukudi | Thuraiyure | Tindivanam | Tiruchendur | Tiruchengode | Tiruchirappalli | Tirunelvelli | Tirupathur | Tirupur | Tiruttani | Tiruvallur | Tiruvannamalai | Tiruvarur | Tiruvellore | Tiruvettipuram | Trichy | Tuticorin | Udumalpet | Ulundurpet | Usiliampatti | Uthangarai | Valapady | Valliyoor | Vaniyambadi | Vedasandur | Vellore | Velur | Vilathikulam | Villupuram | Virudhachalam | Virudhunagar | Wandiwash | Yercaud ";
  s_a[32] = " Agartala | Ambasa | Bampurbari | Belonia | Dhalai | Dharam Nagar | Kailashahar | Kamal Krishnabari | Khopaiyapara | Khowai | Phuldungsei | Radha Kishore Pur | Tripura ";
  s_a[33] = " Achhnera | Agra | Akbarpur | Aliganj | Aligarh | Allahabad | Ambedkar Nagar | Amethi | Amiliya | Amroha | Anola | Atrauli | Auraiya | Azamgarh | Baberu | Badaun | Baghpat | Bagpat | Baheri | Bahraich | Ballia | Balrampur | Banda | Bansdeeh | Bansgaon | Bansi | Barabanki | Bareilly | Basti | Bhadohi | Bharthana | Bharwari | Bhogaon | Bhognipur | Bidhuna | Bijnore | Bikapur | Bilari | Bilgram | Bilhaur | Bindki | Bisalpur | Bisauli | Biswan | Budaun | Budhana | Bulandshahar | Bulandshahr | Capianganj | Chakia | Chandauli | Charkhari | Chhata | Chhibramau | Chirgaon | Chitrakoot | Chunur | Dadri | Dalmau | Dataganj | Debai | Deoband | Deoria | Derapur | Dhampur | Domariyaganj | Dudhi | Etah | Etawah | Faizabad | Farrukhabad | Fatehpur | Firozabad | Garauth | Garhmukteshwar | Gautam Buddha Nagar | Ghatampur | Ghaziabad | Ghazipur | Ghosi | Gonda | Gorakhpur | Gunnaur | Haidergarh | Hamirpur | Hapur | Hardoi | Harraiya | Hasanganj | Hasanpur | Hathras | Jalalabad | Jalaun | Jalesar | Jansath | Jarar | Jasrana | Jaunpur | Jhansi | Jyotiba Phule Nagar | Kadipur | Kaimganj | Kairana | Kaisarganj | Kalpi | Kannauj | Kanpur | Karchhana | Karhal | Karvi | Kasganj | Kaushambi | Kerakat | Khaga | Khair | Khalilabad | Kheri | Konch | Kumaon | Kunda | Kushinagar | Lalganj | Lalitpur | Lucknow | Machlishahar | Maharajganj | Mahoba | Mainpuri | Malihabad | Mariyahu | Math | Mathura | Mau | Maudaha | Maunathbhanjan | Mauranipur | Mawana | Meerut | Mehraun | Meja | Mirzapur | Misrikh | Modinagar | Mohamdabad | Mohamdi | Moradabad | Musafirkhana | Muzaffarnagar | Nagina | Najibabad | Nakur | Nanpara | Naraini | Naugarh | Nawabganj | Nighasan | Noida | Orai | Padrauna | Pahasu | Patti | Pharenda | Phoolpur | Phulpur | Pilibhit | Pitamberpur | Powayan | Pratapgarh | Puranpur | Purwa | Raibareli | Rampur | Ramsanehi Ghat | Rasara | Rath | Robertsganj | Sadabad | Safipur | Sagri | Saharanpur | Sahaswan | Sahjahanpur | Saidpur | Salempur | Salon | Sambhal | Sandila | Sant Kabir Nagar | Sant Ravidas Nagar | Sardhana | Shahabad | Shahganj | Shahjahanpur | Shikohabad | Shravasti | Siddharthnagar | Sidhauli | Sikandra Rao | Sikandrabad | Sitapur | Siyana | Sonbhadra | Soraon | Sultanpur | Tanda | Tarabganj | Tilhar | Unnao | Utraula | Varanasi | Zamania ";
  s_a[34] = " Almora | Bageshwar | Bhatwari | Chakrata | Chamoli | Champawat | Dehradun | Deoprayag | Dharchula | Dunda | Haldwani | Haridwar | Joshimath | Karan Prayag | Kashipur | Khatima | Kichha | Lansdown | Munsiari | Mussoorie | Nainital | Pantnagar | Partapnagar | Pauri Garhwal | Pithoragarh | Purola | Rajgarh | Ranikhet | Roorkee | Rudraprayag | Tehri Garhwal | Udham Singh Nagar | Ukhimath | Uttarkashi ";
  s_a[35] = " Adra | Alipurduar | Amlagora | Arambagh | Asansol | Balurghat | Bankura | Bardhaman | Basirhat | Berhampur | Bethuadahari | Birbhum | Birpara | Bishanpur | Bolpur | Bongoan | Bulbulchandi | Burdwan | Calcutta | Canning | Champadanga | Contai | Cooch Behar | Daimond Harbour | Dalkhola | Dantan | Darjeeling | Dhaniakhali | Dhuliyan | Dinajpur | Dinhata | Durgapur | Gangajalghati | Gangarampur | Ghatal | Guskara | Habra | Haldia | Harirampur | Harishchandrapur | Hooghly | Howrah | Islampur | Jagatballavpur | Jalpaiguri | Jhalda | Jhargram | Kakdwip | Kalchini | Kalimpong | Kalna | Kandi | Karimpur | Katwa | Kharagpur | Khatra | Krishnanagar | Mal Bazar | Malda | Manbazar | Mathabhanga | Medinipur | Mekhliganj | Mirzapur | Murshidabad | Nadia | Nagarakata | Nalhati | Nayagarh | Parganas | Purulia | Raiganj | Rampur Hat | Ranaghat | Seharabazar | Siliguri | Suri | Takipur | Tamluk";
  const passwordShow = () => {
    setPasswordHide(false);
  }
  const passwordShow1 = () => {
    setPasswordHide1(false);
  }
  const passwordShow2 = () => {
    setPasswordHide2(false);
  }

  const passwordShowHide = () => {
    setPasswordHide(true);
  }
  const passwordShowHide1 = () => {
    setPasswordHide1(true);
  }
  const passwordShowHide2 = () => {
    setPasswordHide2(true);
  }
  const {
    MobileNumber,
    CountryCode,
  } = mobileSignup;
  const handleMobileUpdateChange = (name) => (event) => {
    setMonileSignup({ ...mobileSignup, error: false, [name]: event.target.value });
    if (mobileSignup.MobileNumber.length === 9) {
      setDismiss(false);
    }
  };
  const [selectedOption, setSelectedOption] = useState("")
  const [selectedOption1, setSelectedOption1] = useState("")
  const [selectedOption3, setSelectedOption3] = useState("")
  const [selectedOption4, setSelectedOption4] = useState("")
  const handleChange1122 = selectedOption => {
    setSelectedOption1(selectedOption)
  }
  const handleChange11322 = selectedOption => {
    setSelectedOption4(selectedOption)
  }
  const handleChange555 = selectedOption => {
    setoptioncity([])
    setSelectedOption1("")
    var options3 = []
    var city_arr = s_a[selectedOption.value].split("|");
    for (var i = 0; i < city_arr.length; i++) {
      options3.push({
        value: city_arr[i],
        label: city_arr[i]
      })
    }
    setoptioncity(options3)
    setSelectedOption(selectedOption)
    // this.setState({
    //   optioncity:options3,
    //   state:selectedOption.label
    // })
    const label = selectedOption.label
    // this.setState(
    //   { selectedOption},
    //   () => console.log(`Option selected:`, this.state.selectedOption)
    // );
  };

  const handleChange5565 = selectedOption => {
    setoptioncity([])
    setSelectedOption4("")
    var options3 = []
    var city_arr = s_a[selectedOption.value].split("|");
    for (var i = 0; i < city_arr.length; i++) {
      options3.push({
        value: city_arr[i],
        label: city_arr[i]
      })
    }
    setoptioncity(options3)
    setSelectedOption3(selectedOption)
    // this.setState({
    //   optioncity:options3,
    //   state:selectedOption.label
    // })
    const label = selectedOption.label
    // this.setState(
    //   { selectedOption},
    //   () => console.log(`Option selected:`, this.state.selectedOption)
    // );
  };

  const handleChange54565 = (selectedOption,city) => {
    setoptioncity([])
    setSelectedOption4("")
    var options3 = []
    var productIndex = options.findIndex(x => x.label === selectedOption);
    var city_arr = s_a[productIndex].split("|");
    for (var i = 0; i < city_arr.length; i++) {
      options3.push({
        value: city_arr[i],
        label: city_arr[i]
      })
    }
    setoptioncity(options3)
    // setSelectedOption3(selectedOption)
    setSelectedOption4({
      "value":city,
      "label":city
    })
    // this.setState({
    //   optioncity:options3,
    //   state:selectedOption.label
    // })
    const label = selectedOption.label
    // this.setState(
    //   { selectedOption},
    //   () => console.log(`Option selected:`, this.state.selectedOption)
    // );
  };
  const [otpSignup, setOtpSignup] = useState({
    otpCode: '',
  });
  const [mobError, setMobError] = useState('');
  const {
    otpCode
  } = otpSignup;
  const handleOtpChange = (name) => (event) => {
    setOtpSignup({ ...otpSignup, error: false, [name]: event.target.value });
  };
  const getCountTimeout = () => {
    setTimeout(() => {
      setTimeCount(true);
    }, 25000);
  };
  const mobileUpdateSubmit = (event) => {
    event.preventDefault();
    if (mobileSignup.MobileNumber.length === 10) {
      setMonileSignup({ ...mobileSignup, error: false, loading: true });
      if (mobileSignup.MobileNumber.length < 10) {
        setError22('Mobile Number should be greater than 10');
      } else {
        let obj = {
          mobileNumber: mobileSignup.MobileNumber,
          countryCode: mobileSignup.CountryCode,
        };
        return fetchApi('/profile/updateMobile', obj, {}, true, 'post')
          .then((response) => {
            if (response.data.message === 'Access denied') {
              addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                      
               setTimeout(function(){  signout(() => { }) }, 2000);
            }
         
            if (response.data.message === 'success') {
              addToast("Otp sent to your Mobile", {
                appearance: 'success',
                autoDismiss: true,
              });
              setSend(true);
              setseconds(30)
              getCountTimeout();
            } else {
              addToast(response.data.message, {
                appearance: 'warning',
                autoDismiss: true,
              });
            }
          })
          .catch((err) => console.log('error ->', err));
      }
    } else {
      setMobError('Mobile Number should be greater than 10');
    }

  };


  const handleOtpSubmit = (event) => {
    event.preventDefault();

    setOtpSignup({ ...otpSignup, error: false, loading: true });

    let obj = {
      code: otpSignup.otpCode,
      "mobile": mobileSignup.MobileNumber
    };
    return fetchApi('/profile/verifyOTP2', obj, {}, true, 'post')
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
     
        if (response.data.message === 'success') {
          addToast('Mobile Updated Successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          setOtp(true);
        } else {
          addToast("Invalid Otp", {
            appearance: 'warning',
            autoDismiss: true,
          });
        }
      })
      .catch((err) => console.log('error ->', err));



  };

  let state5 = ["Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"]

  const handleShow = () => {
    setAddress({
      area: "",
      city: "",
      state: "",
      pincode: "",
      country: ""
    });
    setShow(true);
  }


  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [refer, setrefer] = useState("")
  const [time, setTime] = useState("")
  const [changepassword, setChangePassword] = useState({
    oldPassword: "",
    password: "",
    confirmpassword: ""
  });
  const [schedule, setschedule] = useState(false)

  const [address, setAddress] = useState({
    firstName33: "",
    lastName33: "",
    area: "",
    city: " ",
    state: "",
    pincode: "",
    country: "",
  });

  const [address1, setAddress1] = useState({
    area1: "",
    city1: " ",
    state1: "",
    pincode1: "",
    country1: "",
    firstName1: "",
    lastName1: ""
  });

  const { area, city, state, pincode, country, firstName33, lastName33 } = address;

  const { area1, city1, state1, pincode1, country1, firstName1, lastName1 } = address1;

  const [addresses, setAddresses] = useState([]);

  const [error, seterror1] = useState("");
  const [error1, seterror2] = useState("");
  const [error3, seterror3] = useState("");

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    profilePic: "",
    username: "",
  });

  const [values, setValues] = useState({
    file: "",
    formData: "",
  });
  const [preview, setPreview] = useState(false);
  const [credits, setcredits] = useState(0)



  const { oldPassword, password, confirmpassword } = changepassword;

  const { firstName, lastName, mobile, profilePic, username } = profile;

  
  const balance = async () => {
    let obj = {
      userId: localStorage.getItem("userId")
    }
    if(localStorage.getItem("userId")!=null)
    {
    return fetchApi("/incash/getuserbyid", obj, {}, true, "post")
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        setcredits(response.data.credits)
        // setrefer("http://139.59.13.212:1556"+"/register"+"?referCode="+response.data.ReferralCode)
      })
      .catch((err) => console.log("error ->", err));
    }
  }

  const init = async () => {
    var userId = await localStorage.getItem("userId");
    var userName = await localStorage.getItem("username");

    let obj = {
      userId: userId,
    };
    return fetchApi("/profile/getProfileData", obj, {}, true, "post")
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.info) {
          setImagePic(response.data.info.profilePic);

          if (response.data.info.mobile !== undefined && response.data.info.mobile !== null) {

            setProfile({
              ...profile,
              profilePic: response.data.info.profilePic,
              firstName: response.data.info.firstName,
              lastName: response.data.info.lastName,

              mobile: parseInt(response.data.info.mobile.substring(3)),

            });
          }
          else {
            setProfile({
              ...profile,
              profilePic: response.data.info.profilePic,
              firstName: response.data.info.firstName,
              lastName: response.data.info.lastName,

            });
          }

        } else {
          // addToast(response.data.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((err) => console.log("error ->", err));
  };
  const init32 = async () => {
    return fetchApi('/myorders/loadMyOrders', null, {}, true, 'post')
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.length > 0) {
          setschedule(true)
        } else {
          addToast(response.data.message, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .catch((err) => console.log('error ->', err));
  };
  const init12 = async () => {
    return fetchApi("/refer/generateReferralCode", null, {}, true, "post")
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }

        let obj = {
          userId: localStorage.getItem("userId")
        }
        return fetchApi("/incash/getuserbyid", obj, {}, true, "post")
          .then((response) => {
            if (response.data.message === 'Access denied') {
              addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                      
               setTimeout(function(){  signout(() => { }) }, 2000);
            }
            setrefer("http://13.127.157.85" + "/register" + "?referCode=" + response.data.ReferralCode)
          })
          .catch((err) => console.log("error ->", err));
      })
      .catch((err) => console.log("error ->", err));
  };
  const init1 = async () => {
    return fetchApi("/profile/getAddress", null, {}, true, "post")
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.info.length >= 0) {
          setAddresses(response.data.info);
        } else {
          // addToast(response.data.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((err) => console.log("error ->", err));
  };

  const init2 = async () => {
    let addressId = await localStorage.getItem("adId");
    let obj = {
      addressId: addressId,
    };
    return fetchApi("/profile/getAddressById", obj, {}, true, "post")
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.address !== undefined && response.data.address.length > 0) {
          setAddress1({
            country1: response.data.address[0].country,
            pincode1: response.data.address[0].pincode,
            state1: response.data.address[0].state,
            city1: response.data.address[0].city,
            area1: response.data.address[0].area,
            firstName1: response.data.address[0].firstName,
            lastName1: response.data.address[0].lastName
          });
          setSelectedOption3({
            "value":response.data.address[0].state,
            "label":response.data.address[0].state
          })
          let sel={
            "value":response.data.address[0].state,
            "label":response.data.address[0].state
          }
          handleChange54565(response.data.address[0].state,response.data.address[0].city)
        } else {
          // addToast(response.data.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((err) => console.log("error ->", err));
  };

  useEffect(() => {
    balance()
    init();
    init1();
    init12();
    init32();
    init2();
  }, []);

  const destroyAddress = (addressId) => {
    let obj = {
      addressId: addressId,
    };
    return fetchApi("/profile/removeAddress", obj, {}, true, "post")
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.message === "success") {
          addToast("Address Removed Successfully", { appearance: "success", autoDismiss: true });
          init1();
        } else {
          addToast(response.data.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((err) => console.log("error ->", err));
  };

  const updateAddress = (addressId) => {
    localStorage.setItem("adId", addressId);
    handleShow1();
    init2();
  };
  const [imagepic, setImagePic] = useState('');

  const handleChange5 = (name) => (event) => {
    setAddress1({ ...address1, error: false, [name]: event.target.value });
    if (address1.pincode1.length === 5) {
      setDismiss(false);
    }
  };

  const handleSubmit5 = async (event) => {
    event.preventDefault();
    if (address1.pincode1.length === 6) {
      setAddress1({ ...address1 });

      let addressId = await localStorage.getItem("adId");

      let obj = {
        addressId: addressId,
        firstName: address1.firstName1,
        lastName: address1.lastName1,
        area: address1.area1,
        city: selectedOption4.label,
        state: selectedOption3.label,
        pincode: parseInt(address1.pincode1),
        country: "India",
      };

      return fetchApi("/profile/UpdateAddress", obj, {}, true, "post")
        .then((response) => {
          if (response.data.message === 'Access denied') {
            addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                    
             setTimeout(function(){  signout(() => { }) }, 2000);
          }
          if (response.data.message === "success") {
            init1();
            handleClose1();
            addToast("Address Updated Successfully", { appearance: "success", autoDismiss: true });
          } else {
            addToast(response.data.message, { appearance: "error", autoDismiss: true });
          }
        })
        .catch((err) => console.log("error ->", err));
    } else {
      setPinError('Pincode Should be 6 digits');
    }

  };
  const handleSubmit32 = (event) => {


    let obj = {
      "time": time + ":00"
    }

    return fetchApi("/profile/updateTime", obj, {}, true, "post")
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.message === "success") {

          seterror3("Time Updated Successfully")

        } else {
          addToast(response.data.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((err) => console.log("error ->", err));
  };
  const handleChange = (name) => (event) => {
    setChangePassword({
      ...changepassword,
      error: false,
      [name]: event.target.value,
    });
    if (changepassword.oldPassword.length > 4 && changepassword.password.length > 4 && changepassword.confirmpassword.length > 4) {
      setDismiss(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setChangePassword({ ...changepassword, error: false, loading: true });

    if (changepassword.password === changepassword.confirmpassword) {

      if (changepassword.password.length < 6 && changepassword.confirmpassword.length < 6) {
        addToast("Password too short", { appearance: "error", autoDismiss: true });
      }

      else {

        let obj = {
          oldPassword: md5(changepassword.oldPassword),
          password: md5(changepassword.password),
        };


        return fetchApi("/profile/setNewPassword", obj, {}, true, "post")
          .then((response) => {
            if (response.data.message === 'Access denied') {
              addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                      
               setTimeout(function(){  signout(() => { }) }, 2000);
            }
            if (response.data.message === "success") {
              seterror2("Password Changed Successfully")
              // addToast("Password Changed Successfully", { appearance: "success", autoDismiss: true });
            } else {
              addToast("Incorrect Old Password", { appearance: "error", autoDismiss: true });
            }
          })
          .catch((err) => console.log("error ->", err));
      }
    }

    else {
      addToast("Password and Confirm Password don't match", { appearance: "error", autoDismiss: true });
    }
  };

  const handleChange1 = (name) => (event) => {
    setProfile({ ...profile, error: false, [name]: event.target.value });
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();
    setProfile({ ...profile, error: false, loading: true });

    let obj = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      mobile: `+91${profile.mobile}`,
    };


    return fetchApi("/profile/updateProfileData", obj, {}, true, "post")
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
       
        if (response.data.message === "success") {
          addToast("Profile  Updated Successfully", { appearance: "success", autoDismiss: true });
        } else {
          addToast(response.data.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((err) => console.log("error ->", err));
  };


  const handleChange2 = (name) => (event) => {
    const value = name === 'file' ? event.target.files[0] : event.target.value;
    Setfile(URL.createObjectURL(event.target.files[0]));
    setPreview(true);
    setImagePic(URL.createObjectURL(event.target.files[0]));
    var formData = new FormData();
    formData.set(name, value);
    setValues({ ...values, [name]: value });
    return fetchApi('/profile/uploadPic', formData, {}, true, 'post')
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
       
        if (response.data.message === 'success') {
          addToast('Profile Pic Uploaded Successfullly', {
            appearance: 'success',
            autoDismiss: true,
          });
        } else {
          addToast(response.data.message, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .catch((err) => console.log('error ->', err));
  };



  const handleChange3 = (name) => (event) => {
    setProfile({ ...profile, error: false, [name]: event.target.value });
  };

  const handleSubmit3 = (event) => {
    event.preventDefault();
    setProfile({ ...profile });

    let obj = {
      userEmail: profile.username,
    };

    return fetchApi("/sendEmailActivationLink", obj, {}, true, "post")
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
 
        if (response.data.message === "success") {
          // localStorage.setItem("userEmail", profile.username);
          seterror1("Email updated successfully")
          // addToast("Username Updated Successfully", { appearance: "success", autoDismiss: true }); 
          // init();
        } else {
          addToast("Email Already Registered", { appearance: "error", autoDismiss: true });
        }
      })
      .catch((err) => console.log("error ->", err));
  };

  const [pinError, setPinError] = useState('');
  const handleChange4 = (name) => (event) => {
    setAddress({ ...address, error: false, [name]: event.target.value });
    if (address.pincode.length === 5) {
      setDismiss(false);
    }
  };

  const handleSubmit4 = (event) => {
    event.preventDefault();
    if (address.pincode.length === 6) {
      setAddress({ ...address });

      let obj = {
        firstName: address.firstName33,
        lastName: address.lastName33,
        area: address.area,
        city: selectedOption1.value,
        state: selectedOption.label,
        pincode: parseInt(address.pincode),
        country: "India",
      };

      return fetchApi("/profile/addAddress", obj, {}, true, "post")
        .then((response) => {
          if (response.data.message === 'Access denied') {
            addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                    
             setTimeout(function(){  signout(() => { }) }, 2000);
          }
          if (response.data.message === "success") {
            addToast("Address Added Successfully", { appearance: "success", autoDismiss: true });
            init1();
            handleClose();
          } else {
            addToast(response.data.message, { appearance: "error", autoDismiss: true });
          }
        })
        .catch((err) => console.log("error ->", err));
    } else {
      setPinError("Pincode Should be 6 digits");
    }


  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech | My Account</title>
        <meta
          name="description"
          content="Utsav Plasto Tech"
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title> Update Address</Modal.Title>
        </Modal.Header>
        <form autoComplete={'' + Math.random()} onSubmit={handleSubmit5}>
          <Modal.Body>
            <div className="row">

              <div className="col-lg-12 col-md-12">
                <div className="billing-info">
                  <label>Area</label>
                  <textarea
                    type="text"
                    autoComplete={'' + Math.random()}
                    value={area1}
                    onChange={handleChange5("area1")}
                    required={true}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="billing-info">
                  <label>First Name</label>
                  <input
                    type="text"
                    autoComplete={'' + Math.random()}
                    value={firstName1}
                    onChange={handleChange5("firstName1")}
                    required={true}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="billing-info">
                  <label>Last Name</label>
                  <input
                    type="text"
                    autoComplete={'' + Math.random()}
                    value={lastName1}
                    onChange={handleChange5("lastName1")}
                    required={true}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="billing-info">
                  <Form>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>State</Form.Label>
                      {/* <Form.Control as="select" value={state} onChange={handleChange4("state")} className="form-control-select-option">
                        {state5.map((state_name, key) => {
                          return <option key={key} value={state_name}>{state_name}</option>
                        })}
                      </Form.Control> */}
                      <Select
                      isSearchable
                      required
                        placeholder="Select state"
                        value={selectedOption3}
                        onChange={handleChange5565}
                        options={options}
                      />
                    </Form.Group>

                  </Form>

                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="billing-info">
                  <label>City</label>
                  {/* <input
                    type="text"
                    value={city}
                    onChange={handleChange4("city")}
                    required={true}
                  /> */}
                  <Select
                  isSearchable
                  required
                    placeholder="Select city"
                    value={selectedOption4}
                    onChange={handleChange11322}
                    options={optioncity}
                  />
                </div>
              </div>

              <div className="col-lg-6 col-md-6">
                <div className="billing-info">
                  <label>Pincode</label>
                  <input
                    type="number"
                    value={pincode1}
                    onChange={handleChange5("pincode1")}
                    maxLength="6"
                    autoComplete={'' + Math.random()}
                    required={true}
                    onInput={maxLengthCheck}
                    onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()}
                  />
                  <span style={{ color: '#FC2F25' }}>{pinError}</span>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 d-none d-lg-none d-sm-none d-xs-none">
                <div className="billing-info">
                  <label>Country</label>
                  <input
                    type="text"
                    value={"India"}
                    autoComplete={'' + Math.random()}
                    required={true}
                    onChange={handleChange5("country1")}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{ backgroundColor: '#062a5a', color: '#fff', borderColor: '#062a5a', borderRadius: 0 }} variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <form  autoComplete={'' + Math.random()}  onSubmit={handleSubmit4}>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="billing-info">
                  <label>Area</label>
                  <textarea
                    type="text"
                    autoComplete={'' + Math.random()}
                    value={area}
                    onChange={handleChange4("area")}
                    required={true}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 ">
                <div className="billing-info">
                  <label>First Name</label>
                  <input
                    type="text"
                    autoComplete={'' + Math.random()}
                    value={firstName33}
                    required={true}
                    onChange={handleChange4("firstName33")}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 ">
                <div className="billing-info">
                  <label>Last Name</label>
                  <input
                    type="text"
                    autoComplete={'' + Math.random()}
                    value={lastName33}
                    required={true}
                    onChange={handleChange4("lastName33")}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="billing-info">
                  <Form>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>State</Form.Label>
                      {/* <Form.Control as="select" value={state} onChange={handleChange4("state")} className="form-control-select-option">
                        {state5.map((state_name, key) => {
                          return <option key={key} value={state_name}>{state_name}</option>
                        })}
                      </Form.Control> */}
                      <Select
                      isSearchable
                      required
                        placeholder="Select state"
                        value={selectedOption}
                        onChange={handleChange555}
                        options={options}
                      />
                    </Form.Group>

                  </Form>

                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="billing-info">
                  <label>City</label>
                  {/* <input
                    type="text"
                    value={city}
                    onChange={handleChange4("city")}
                    required={true}
                  /> */}
                  <Select
                  isSearchable
                  required
                    placeholder="Select city"
                    value={selectedOption1}
                    onChange={handleChange1122}
                    options={optioncity}
                  />
                </div>
              </div>

              <div className="col-lg-6 col-md-6">
                <div className="billing-info">
                  <label>Pincode</label>
                  <input
                    type="number"
                    value={pincode}
                    required={true}
                    autoComplete={'' + Math.random()}
                    onChange={handleChange4("pincode")}
                    maxLength="6"
                    onInput={maxLengthCheck}
                    onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()}
                  />
                  <span style={{ color: '#FC2F25' }}>{pinError}</span>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 d-none d-lg-none d-sm-none d-xs-none">
                <div className="billing-info">
                  <label>Country</label>
                  <input
                    type="text"
                    autoComplete={'' + Math.random()}
                    value="India"
                    required={true}
                    onChange={handleChange4("country")}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={dismiss} style={{ backgroundColor: '#062a5a', color: '#fff', borderRadius: 0, borderColor: '#062a5a' }} variant="primary" type="submit">
              Add Address
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1  .</span> Edit your account information{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>My Account Information</h4>
                              <h5>Your Personal Details</h5>
                              <div className="row">
                                <div className='col-md-4'>
                                  {imagepic !== undefined ? (
                                    <img
                                      src={
                                        preview === false
                                          ? `https://api.utsavplastotech.co.in${imagepic}`
                                          : `${imagepic}`
                                      }
                                      className='img img-fluid img-thumbnail mb-3'
                                      style={{
                                        maxHeight: 'auto',
                                        maxWidth: '100%',
                                      }}
                                    />
                                  ) : (
                                      <img
                                        src='../../assets/img/externalimages/dummy_user.png'
                                        className='img img-fluid img-thumbnail mb-3'
                                        style={{
                                          maxHeight: 'auto',
                                          maxWidth: '100%',
                                        }}
                                      />
                                    )}
                                </div>
                                <div className="col-md-8">
                                  <div className="form-group">

                                    <div class="button-wrap">
                                      <label class="new-button" for="upload"> Upload Profile Pic</label>
                                      <input
                                        id="upload"
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        required={true}
                                        onChange={handleChange2("file")}
                                      />
                                    </div>

                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <form autoComplete={'' + Math.random()} onSubmit={handleSubmit1}>
                                <div className="row">
                                  <div className="col-lg-6 col-md-6">
                                    <div className="billing-info">
                                      <label>First Name</label>
                                      <input
                                        type="text"
                                        autoComplete={'' + Math.random()}
                                        value={firstName}
                                        required={true}
                                        onChange={handleChange1("firstName")}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-6">
                                    <div className="billing-info">
                                      <label>Last Name</label>
                                      <input
                                        type="text"
                                        autoComplete={'' + Math.random()}
                                        value={lastName}
                                        required={true}
                                        onChange={handleChange1("lastName")}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="billing-back-btn">
                                  <div className="billing-btn">
                                    <button type="submit" style={{ backgroundColor: '#062a5a', color: '#fff' }}>Continue</button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Update Mobile
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          {!send ? (<form autoComplete={'' + Math.random()} onSubmit={mobileUpdateSubmit}>
                            <div className="myaccount-info-wrapper">
                              <div className="account-info-wrapper">
                                <h4>Update Mobile</h4>
                              </div>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Enter mobile</label>
                                    <input
                                    name="phoneNumber" 
                                    id="phoneNumber" 
                                    title="Please use a 10 digit telephone number with no dashes or dots" 
                                    pattern="[0-9]{10}"  
                                    maxLength={10} minLength={10}  
                                    required={true}  type="tel" 
                                      placeholder='Verify Phone'
                                      required={true}
                                      autoComplete={'' + Math.random()}
                                      onChange={handleMobileUpdateChange('MobileNumber')}
                                      value={MobileNumber}
                                      maxLength="10"
                                      onInput={maxLengthCheck}
                                      onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()}
                                    />
                                    <span style={{ color: '#FB2B21' }}>{mobError}</span>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <div className='button-box'>
                                      <Button  style={{ backgroundColor: '#062a5a', color: 'white', border: '1px solid #A1C51D', marginTop: 20, marginLeft: 10, borderRadius: 0 }} type='submit'>
                                        <span>Send OTP</span>
                                      </Button>
                                    </div>
                                  </div>

                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  {/* <button style={{ backgroundColor: '#062a5a', color: '#fff' }} type="submit">Continue</button> */}
                                </div>
                              </div>
                            </div>
                          </form>) : (<><form autoComplete={'' + Math.random()} onSubmit={handleOtpSubmit}>
                            <div className="myaccount-info-wrapper">
                              <div className="account-info-wrapper">
                                <h4>Update Mobile</h4>
                              </div>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Enter Otp</label>
                                    <input
                                      type='text'
                                      autoComplete={'' + Math.random()}
                                      name='last-name'
                                      placeholder='Enter OTP'
                                      className="mt-3"
                                      required={true}
                                      maxLength="6"
                                      onChange={handleOtpChange('otpCode')}
                                      value={otpCode}
                                    />
                                    <span style={{ color: '#FB3027' }}>{error22}</span>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <div className='button-box'>
                                      <button style={{ backgroundColor: '#062a5a', color: 'white', border: '1px solid #062a5a', marginTop: 20, marginLeft: 10 }} type='submit'>
                                        <span>verify OTP</span>
                                      </button>
                                    </div>
                                  </div>

                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  {/* <button style={{ backgroundColor: '#062a5a', color: '#fff' }} type="submit">Continue</button> */}
                                </div>
                              </div>
                            </div>
                          </form>
                          <form onClick={(event)=>event.preventDefault()}>
                          <div className="button-box">
                          <button style={{ backgroundColor: '#062a5a', color: 'white', border: '1px solid #062a5a',  marginLeft: 10,marginLeft:"12.4em",position:"absolute",marginTop:"-4.5em"}}>
                         {  seconds === 0
                  ? <span onClick={mobileUpdateSubmit}> Resend OTP</span>
                  :  <span>Resend OTP After: {seconds < 10 ? `0${seconds}` : seconds} </span>
              }
                     
                               
                              </button>
                              </div>
                          </form></>)}

                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="4">
                          <h3 className="panel-title">
                            <span>3.</span> Update Email
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="4">
                        <Card.Body>
                          <form onSubmit={handleSubmit3}>
                            <div className="myaccount-info-wrapper">
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Update Email</label>
                                    <input
                                      type="text"
                                      pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" 
                                      title="Please Enter Valid Email"
                                      name="user-name"
                                      placeholder="Enter Email"
                                      required={true}
                                      onChange={handleChange3("username")}
                                      value={username}
                                    />
                                    <h5 style={{ color: "green", marginLeft: "1%", marginTop: "5%" }}>{error}</h5>
                                  </div>
                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <Button  style={{ backgroundColor: '#062a5a', color: '#fff', borderRadius: 0 }} type="submit">Continue</Button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="8">
                          <h3 className="panel-title">
                            <span>4 .</span> Change your password
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="8">
                        <Card.Body>
                          <form autoComplete={'' + Math.random()} onSubmit={handleSubmit}>
                            <div className="myaccount-info-wrapper">
                              <div className="account-info-wrapper">
                                <h4>Change Password</h4>
                                <h5>Your Password</h5>
                              </div>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>Old Password</label>

                                    {/* <input
                                      type={passwordHide ? "password" : "text"}
                                      name="old-password"
                                      required={true}
                                      placeholder="Enter Old Password"
                                      onChange={handleChange("oldPassword")}
                                      value={oldPassword}
                                    /> */}



                                    <div class="input-group mb-2 mr-sm-2">
                                      <input
                                        type={passwordHide ? "password" : "text"}
                                        name="old-password"
                                        autoComplete={'' + Math.random()}
                                        class="form-control"
                                        required={true}
                                        minLength={8}

                                        style={{ boxShadow: 'none', borderRight: 0 }}
                                        id="inlineFormInputGroupUsername2"
                                        placeholder="Enter Old Password"
                                        onChange={handleChange("oldPassword")}
                                        value={oldPassword}
                                      />

                                      <div class="input-group-prepend">
                                        <div class="input-group-text bg-white" style={{ borderLeft: 0 }}>{passwordHide ? <i className="fa fa-eye" style={{  fontSize: '22px', cursor: 'pointer' }} onClick={passwordShow}></i> : <i className="fa fa-eye-slash" style={{  fontSize: '22px', cursor: 'pointer' }} onClick={passwordShowHide}></i>}</div>
                                      </div>
                                    </div>


                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label>New Password</label>
                                    {/* <input
                                      type="password"
                                      name="old-password"
                                      required={true}
                                      placeholder="Enter New Password"
                                      onChange={handleChange("password")}
                                      value={password}
                                    /> */}

                                    <div class="input-group mb-2 mr-sm-2">
                                      <input
                                        type={passwordHide1 ? "password" : "text"}
                                        name="old-password"
                                        class="form-control"
                                        autoComplete={'' + Math.random()}
                                        required={true}
                                        minLength={8}

                                        style={{ boxShadow: 'none', borderRight: 0 }}
                                        id="inlineFormInputGroupUsername2"
                                        placeholder="Enter New Password"
                                        onChange={handleChange("password")}
                                        value={password}
                                      />

                                      <div class="input-group-prepend">
                                        <div class="input-group-text bg-white" style={{ borderLeft: 0 }}>{passwordHide1 ? <i className="fa fa-eye" style={{  fontSize: '22px', cursor: 'pointer' }} onClick={passwordShow1}></i> : <i className="fa fa-eye-slash" style={{  fontSize: '22px', cursor: 'pointer' }} onClick={passwordShowHide1}></i>}</div>
                                      </div>
                                    </div>



                                  </div>
                                  <div className="billing-info">
                                    <label>Confirm Password</label>
                                    {/* <input
                                      type="password"
                                      name="old-password"
                                      required={true}
                                      placeholder="Enter New Password"
                                      onChange={handleChange("confirmpassword")}
                                      value={confirmpassword}
                                    /> */}

                                    <div class="input-group mb-2 mr-sm-2">
                                      <input
                                        type={passwordHide2 ? "password" : "text"}
                                        name="old-password"
                                        class="form-control"
                                        autoComplete={'' + Math.random()}
                                        required={true}
                                        minLength={8}

                                        style={{ boxShadow: 'none', borderRight: 0 }}
                                        id="inlineFormInputGroupUsername2"
                                        placeholder="Enter New Password"
                                        onChange={handleChange("confirmpassword")}
                                        value={confirmpassword}
                                      />

                                      <div class="input-group-prepend">
                                        <div class="input-group-text bg-white" style={{ borderLeft: 0 }}>{passwordHide2 ? <i className="fa fa-eye" style={{  fontSize: '22px', cursor: 'pointer' }} onClick={passwordShow2}></i> : <i className="fa fa-eye-slash" style={{  fontSize: '22px', cursor: 'pointer' }} onClick={passwordShowHide2}></i>}</div>
                                      </div>
                                    </div>

                                    <h5 style={{ color: "green", marginLeft: "1%", marginTop: "5%" }}>{error1}</h5>

                                  </div>
                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <Button disabled={dismiss} style={{ backgroundColor: '#062a5a', color: '#fff', borderRadius: 0 }} type="submit">Continue</Button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                 
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="5">
                          <h3 className="panel-title">
                            <span>5.</span> Modify your address book entries{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="5">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper  border border-0 mb-0">
                              <h4>Address Book Entries</h4>
                            </div>
                            <div style={{ overflowX: 'scroll' }}>
                              <div className="row">
                                <div className="col-12">

                                  <table class="table table-hover  border border-1">
                                    <thead>
                                      <tr>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Country</th>
                                        <th scope="col">Pincode</th>
                                        <th scope="col">State</th>
                                        <th scope="col">City</th>
                                        <th scope="col">Area</th>
                                        <th scope="col">Update</th>
                                        <th scope="col">Delete</th>

                                      </tr>
                                    </thead>
                                    <tbody>
                                      {addresses.map((p, i) => (
                                        <tr key={i}>
                                          <td>{p.firstName}</td>
                                          <td>{p.lastName}</td>
                                          <td>{p.country}</td>
                                          <td>{p.pincode}</td>
                                          <td>{p.state}</td>
                                          <td>{p.city}</td>
                                          <td>{p.area}</td>
                                          <td>
                                            <button type="button" onClick={() =>
                                              updateAddress(p.addressId)
                                            }
                                              className="btn btn-primary"
                                              style={{ backgroundColor: '#062a5a', color: '#fff' }}
                                            >
                                              Update
                                      </button>
                                          </td>
                                          <td>
                                            <button type="button" onClick={() =>
                                              destroyAddress(p.addressId)
                                            } className="btn btn-danger">
                                              Delete
                                      </button>
                                          </td>
                                        </tr>

                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                {addresses.length < 3 ? (<button style={{ backgroundColor: '#062a5a', color: '#fff' }} onClick={handleShow}>
                                  Add Address
                                </button>) : null}
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                   
                 
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment >
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
};

export default MyAccount;