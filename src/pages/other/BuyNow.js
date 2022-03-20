
import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import MetaTags from 'react-meta-tags';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import LayoutOne from '../../layouts/LayoutOne';
import Form from 'react-bootstrap/Form'
// import './style.css';
import BaseSelect from "react-select";
import FixRequiredSelect from "./FixRequiredSelect";
import {
 fetchcarts,
  updateCart
} from '../../redux/actions/cartActions';
import { fetchApi } from '../../services/api';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import Button from 'react-bootstrap/Button'
import './style.css';
import { signout } from '../../auth/index';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
const Select = props => (
  <FixRequiredSelect
    {...props}
    SelectComponent={BaseSelect}
    options={props.options || []}
  />
);
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
const BuyNow = ({ location }) => {
  const dispatch = useDispatch();

  const { addToast } = useToasts();
  const myRefname = useRef(null);
  // eslint-disable-next-line
  const [messageReferral, setMessageReferral] = useState('');
  const [paymentbgcolor, setpaymentbgcolor] = useState(false);
  const [referral, setReferral] = useState('');
  const [billerror, setbillerror] = useState(false);
  const [show4, setShow4] = useState(false);
  const [enq, setenq] = useState("")
  const [vouchers, setVouchers] = useState([]);
  // eslint-disable-next-line
  const { redirect2, setRedirect } = useState(false)
  const [email, setemail] = useState('');
  const [optioncity, setoptioncity] = useState([])
  const [selectedOption, setSelectedOption] = useState("")
  const [selectedOption1, setSelectedOption1] = useState("")
  const [selectedOption3, setSelectedOption3] = useState("")
  const [selectedOption4, setSelectedOption4] = useState("")
  const [mobilenumber, setmobilenumber] = useState('');
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button == 2) {
        e.preventDefault();
        return false;
      }

    }
  }, [])
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
  
  };

  const handleClose1 = () => {
    // setRedirect(true)
    window.location.href = "/"
    setShow1(false)
  }
  const handleShow1 = () => setShow1(true);
  const [disable, setdisable] = useState(false)
  const [show1, setShow1] = useState(false);
  const [dismiss1, setDismiss1] = useState(true);
  const [orderid, setorderid] = useState('');

  const handleClick = () => {
    // myRefname.current.focus();
    myRefname.current.dispatchEvent(
      new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      }),
    );
  }
  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }

  const [grandTotal, setGrandTotal] = useState(0);
  const [totaltax, setTotaltax] = useState(0);
  const [creditsUsed, setcreditsUsed] = useState(0);
  const [subtotal, setsubtotal] = useState(0);
  const [message, setmessage] = useState('');
  const [quick, setquick] = useState([]);
  const handleClose44 = () => setShow4(false);
  const [devliveryCharges, setDeliveryCharges] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [productId, setproductId] = useState("")
  const [discount, setDiscount] = useState('');
  const [disco, setDisco] = useState(0);
  const [add, setadd] = useState(false);
  // const [showCod, setShowCod] = useState();
  const [referralshow, setReferralShow] = useState(true);
  const [addresses, setAddresses] = useState([]);
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
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    country: '',
    pincode: '',
    state: '',
    city: '',
    area: '',
  });

  const [address1, setAddress1] = useState({
    country1: '',
    pincode1: '',
    state1: '',
    city1: '',
    area1: '',
    firstName1: '',
    lastName1: ''
  });
  const [address2, setAddress2] = useState({
    area2: '',
    city2: ' ',
    state2: '',
    pincode2: '',
    country2: '',
    firstName2: '',
    lastName2: ''
  });
  const { area2, city2, state2, pincode2, country2, firstName2, lastName2 } = address2;
  const[loader,setloader]=useState(false)
  const[buttondisable,setbuttondisable]=useState(false)
  const [checked1, setChecked1] = React.useState(true);
  const [checked, setChecked] = React.useState(false);
  const [influencer, setInfluencer] = useState([]);
  const [dismiss, setDismiss] = useState(true);
  const { area1, city1, state1, pincode1, country1, firstName1, lastName1 } = address1;
  const [pinError, setPinError] = useState('');
  const [show22, setShow22] = useState(false);
  const handleClose22 = () => setShow22(false);
  const [paymentmode, setPaymentMode] = useState('paypal');
  const [mobile, setmobile] = useState("")

  const [vouchershow, setVoucherShow] = useState(true);

  const dataReducer = useSelector((state) => state.cartData);
  const dataReducer1 = useSelector((state) => state.cartData.cartPrice.order);
  const [credits, setcredits] = useState(0)
  const check = () => {
    if (checked == false) {
      if (grandTotal > 1000) {
        setChecked(!checked)
        let obj = {
          type: 'cod',
          couponDiscount: disco,
          useCredits: true
        };

        return fetchApi('/userdash/quickBuyPrice', obj, {}, true, 'post')
          .then((response) => {
            if (response.data.message === 'Access denied') {
              addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                      
               setTimeout(function(){  signout(() => { }) }, 2000);
            }
            if (response.data.result !== null) {
              setGrandTotal(response.data.result.order.grandTotal);
              setsubtotal(response.data.result.order.total);
              setTotalDiscount(response.data.result.order.totaldiscount);
              setTotaltax(response.data.result.order.totaltax);
              setDeliveryCharges(response.data.result.order.deliveryCharges);
              setcreditsUsed(response.data.result.order.credit)
            } else {
              addToast(response.data.message, {
                appearance: 'error',
                autoDismiss: true,
              });
            }
          })
          .catch((err) => console.log('error ->', err));
      }
      else {
        addToast("Credits can only be used with minimum order value of 1000", {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
    else {
      let obj = {
        type: 'cod',
        couponDiscount: disco,
        useCredits: false
      };
      setChecked(!checked)
      return fetchApi('/userdash/quickBuyPrice', obj, {}, true, 'post')
        .then((response) => {
          if (response.data.message === 'Access denied') {
            addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                    
             setTimeout(function(){  signout(() => { }) }, 2000);
          }
          if (response.data.result !== null) {
            setGrandTotal(response.data.result.order.grandTotal);
            setsubtotal(response.data.result.order.total);
            setTotalDiscount(response.data.result.order.totaldiscount);
            setTotaltax(response.data.result.order.totaltax);
            setDeliveryCharges(response.data.result.order.deliveryCharges);
            setcreditsUsed(response.data.result.order.credit)
          } else {
            addToast(response.data.message, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        })
        .catch((err) => console.log('error ->', err));



    }

  }
  const handleChangre = (event) => {
    setPaymentMode(event.target.value);
  };
  const { pathname } = location;
  const init12 = async () => {
    let obj = {
      userId: localStorage.getItem("userId")
    }
    return fetchApi("/incash/getuserbyid", obj, {}, true, "post")
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        setcredits(response.data.credits)
        setmobile(response.data.userEmail)
        setmobilenumber(response.data.mobile)


        // setrefer("http://139.59.13.212:1556"+"/register"+"?referCode="+response.data.ReferralCode)
      })
      .catch((err) => console.log("error ->", err));
  }
  const init3 = async () => {
    return fetchApi('/profile/getAddress', null, {}, true, 'post')
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.info.length >= 0) {
          var FullName = localStorage.getItem('fullname');
          setAddresses(response.data.info);
          setAddress({
            firstName: response.data.info[0].firstName,
            lastName: response.data.info[0].lastName,
            country: response.data.info[0].country,
            pincode: response.data.info[0].pincode,
            state: response.data.info[0].state,
            city: response.data.info[0].city,
            area: response.data.info[0].area,
          });
          setadd(true);
        } else {
          // addToast(response.data.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((err) => console.log('error ->', err));
  };

  const makePayment=()=>
{
getData({amount:grandTotal.toFixed(2)})
}
const getData=(data)=>
{
  return fetchApi("/transaction/create-transaction", data, {}, true, "post")
  .then((res) => {
    if (res.data.success === true) {
     
      let paytm=res.data.message
      paytm.mid="IVNrxt82518286396827"
      localStorage.setItem("transaction",res.data.message.orderId)
      paytm.txnToken=JSON.parse(paytm.txnToken).body.txnToken

    
      // paytm.orderId=paytm.ORDER_ID
      var information={
        action:"https://securegw.paytm.in/theia/api/v1/showPaymentPage?mid=IVNrxt82518286396827&orderId="+res.data.message.orderId,
        params:  paytm
      }
    
    // return 0
    post(information)
       

    }
    else {
      // seterror(res.message)
      addToast(res.message, { appearance: "error", autoDismiss: true });
    }
  })
  .catch((err) => console.log("error ->", err));
}



function post(details) {
  const form = buildForm(details)
  
  document.body.appendChild(form)
  form.submit()
  form.remove()
}
function buildForm({ action, params }) {
    
  const form = document.createElement('form')
  form.setAttribute('method', 'post')
  form.setAttribute('action', action)
  form.setAttribute('name',"paytm")

  Object.keys(params).forEach(key => {
    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', key)
    input.setAttribute('value', stringifyValue(params[key]))
    form.appendChild(input)
  })

  return form
}

function isDate(val) {
  // Cross realm comptatible
  return Object.prototype.toString.call(val) === '[object Date]'
}

function isObj(val) {
  return typeof val === 'object'
}

 function stringifyValue(val) {
  if (isObj(val) && !isDate(val)) {
    return JSON.stringify(val)
  } else {
    return val
  }
}
  const init1 = () => {
    let obj = {
      type: 'cod',
    };

    return fetchApi('/userdash/quickBuyPrice', obj, {}, true, 'post')
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.result !== null) {
          setsubtotal(response.data.result.order.total);
          setGrandTotal(response.data.result.order.grandTotal);
          setTotalDiscount(disco);
          setTotaltax(response.data.result.order.totaltax);
          setDeliveryCharges(response.data.result.order.deliveryCharges);
        } else {
          addToast(response.data.message, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .catch((err) => console.log('error ->', err));
  };

  const handleChange = (name) => (event) => {
    setDiscount(event.target.value);
  };
  const init202 = async () => {
    let obj = {
      "voucherDate": "rohan",
      "expiryDate": "rohan"
    }
    var arr = []
    return fetchApi('/influencer/loadVoucher', obj, {}, false, 'post')
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.vouchers.result.length >= 0) {
          for (var i = 0; i < response.data.vouchers.result.length; i++) {
            if (response.data.vouchers.result[i].expired == false) {
              arr.push(response.data.vouchers.result[i])
            }
          }
          setInfluencer(arr);
        } else {
          // addToast(response.data.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((err) => console.log('error ->', err));
  };
  const handleToggle = (p) => {
    var FullName = localStorage.getItem('fullname');
    setAddress({
      firstName: p.firstName,
      lastName: p.lastName,
      country: p.country,
      pincode: p.pincode,
      state: p.state,
      city: p.city,
      area: p.area,
    });
    setadd(true);
  };

  const handleSubmit555 = async (event) => {
    event.preventDefault();
    address2.state2=selectedOption3.label
    address2.city2=selectedOption4.label
    setAddress2({ ...address2 });
    setShow22(false)
    setbillerror(true)
    addToast('Billing Address Added', {
      appearance: 'success',
      autoDismiss: true,
    });

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

  const init32 = () => {
    return fetchApi('/userdash/loadQuickBuy', null, {}, true, 'post')
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        } else if (response.data.length > 0) {
          setquick(response.data)
          setproductId(response.data[0].productId)
        } else {

          //  addToast("No Items in Cart", { appearance: "warning", autoDismiss: true });
        }
      })
      .catch((err) => console.log('error ->', err));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (referralshow == false) {
      addToast('Only voucher or referral code can be applied at a time', {
        appearance: 'warning',
        autoDismiss: true,
      });
      return 0
    }
    var disc = 0;
    for (var i = 0; i < vouchers.length; i++) {
      if (vouchers[i].voucherId === discount.toString().toLowerCase()) {
        if(discount.toString().toLowerCase()==="nikhilmahajan20")
        {
          if(dataReducer1.grandTotal>=500)
          {
            disc = vouchers[i].discount;
            setDisco(disc);
            init1()
            // if(messageReferral!="")
            // {
            //   addToast('Only voucher or referral code can be applied at a time', {
            //     appearance: 'warning',
            //     autoDismiss: true,
            //   });
            // }
            setMessageReferral(' ');
            setmessage('Coupon Applied with ' + disc + '% discount');
            addToast('Coupon Successfully Applied', {
              appearance: 'success',
              autoDismiss: true,
            });
          
            setVoucherShow(false);
          }
          else{
            addToast('Invalid coupon Minimum Cart Value For availing this coupon is ₹ 500', { appearance: 'error', autoDismiss: true });
            init1()      
            setmessage('');
          }
        }
        if(discount.toString().toLowerCase()==="alaroma10")
        {
          if(grandTotal>=500)
          {
            disc = vouchers[i].discount;
            setDisco(disc);
            init1()

            // if(messageReferral!="")
            // {
            //   addToast('Only voucher or referral code can be applied at a time', {
            //     appearance: 'warning',
            //     autoDismiss: true,
            //   });
            // }
            setMessageReferral(' ');
            setmessage('Coupon Applied with ' + disc + '% discount');
            addToast('Coupon Successfully Applied', {
              appearance: 'success',
              autoDismiss: true,
            });
          
            setVoucherShow(false);
          }
          else{
            addToast('Invalid coupon Minimum Cart Value For availing this coupon is ₹ 500', { appearance: 'error', autoDismiss: true });
            init1()

      
            setmessage('');
          }
        }
        if(discount.toString().toLowerCase()==="alaroma20")
        {
          if(grandTotal>=1000)
          {
            disc = vouchers[i].discount;
            setDisco(disc);
            init1()

            // if(messageReferral!="")
            // {
            //   addToast('Only voucher or referral code can be applied at a time', {
            //     appearance: 'warning',
            //     autoDismiss: true,
            //   });
            // }
            setMessageReferral(' ');
            setmessage('Coupon Applied with ' + disc + '% discount');
            addToast('Coupon Successfully Applied', {
              appearance: 'success',
              autoDismiss: true,
            });
          
            setVoucherShow(false);
          }
          else{
            addToast('Invalid coupon Minimum Cart Value For availing this coupon is ₹ 1000', { appearance: 'error', autoDismiss: true });
            init1()

      
            setmessage('');
          }
        }
        if(discount.toString().toLowerCase()==="alaroma30")
        {
          if(grandTotal>=1500)
          {
            disc = vouchers[i].discount;
            setDisco(disc);
            init1()

            // if(messageReferral!="")
            // {
            //   addToast('Only voucher or referral code can be applied at a time', {
            //     appearance: 'warning',
            //     autoDismiss: true,
            //   });
            // }
            setMessageReferral(' ');
            setmessage('Coupon Applied with ' + disc + '% discount');
            addToast('Coupon Successfully Applied', {
              appearance: 'success',
              autoDismiss: true,
            });
          
            setVoucherShow(false);
          }
          else{
            addToast('Invalid coupon Minimum Cart Value For availing this coupon is ₹ 1500', { appearance: 'error', autoDismiss: true });
            init1()

      
            setmessage('');
          }
        }
      }
    }
    if (disc === 0) {
      addToast('Invalid coupon', { appearance: 'error', autoDismiss: true });
      init1()
      setmessage('');
    }
    setDisco(disc);
    let obj = {
      type: 'cod',
      couponDiscount: parseInt(disc),
    };

    return fetchApi('/userdash/quickBuyPrice', obj, {}, true, 'post')
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.result !== null) {
          setGrandTotal(response.data.result.order.grandTotal);
          setsubtotal(response.data.result.order.total);
          setTotalDiscount(response.data.result.order.totaldiscount);
          setTotaltax(response.data.result.order.totaltax);
          setDeliveryCharges(response.data.result.order.deliveryCharges);
        } else {
          addToast(response.data.message, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .catch((err) => console.log('error ->', err));
  };
  const redirectHome = () => {
    if (redirect2) {
      return <Redirect to={process.env.PUBLIC_URL + `/`} />;
    }
  };
  const handleChangeReferral = (name) => (event) => {
    setReferral(event.target.value);
  };

  const handleSubmit99 = (event) => {
    event.preventDefault();
    if (vouchershow == false) {
      addToast('Only voucher or referral code can be applied at a time', {
        appearance: 'warning',
        autoDismiss: true,
      });
      return 0
    }
    var disc = 0;
    for (var i = 0; i < influencer.length; i++) {
      if (influencer[i].influencerId === referral.toString().toLowerCase()) {
        disc = influencer[i].discount;
        setDisco(disc);
        // if(message!="")
        // {
        //   addToast('Only voucher or referral code can be applied at a time', {
        //     appearance: 'warning',
        //     autoDismiss: true,
        //   });
        // }
        setmessage("")

        setMessageReferral('Referral Code Applied with ' + disc + '% discount');
        addToast('Referral Code Successfully Applied', {
          appearance: 'success',
          autoDismiss: true,
        });
        setReferralShow(false)
      }
    }
    if (disc === 0) {
      addToast('Invalid Referral Code', { appearance: 'error', autoDismiss: true });
      init1()
      setMessageReferral('');
    }
    setDisco(disc);
    let obj = {
      type: 'cod',
      couponDiscount: parseInt(disc),
    };

    return fetchApi('/userdash/quickBuyPrice', obj, {}, true, 'post')
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.result !== null) {
          setGrandTotal(response.data.result.order.grandTotal);
          setsubtotal(response.data.result.order.total);
          setTotalDiscount(response.data.result.order.totaldiscount);
          setTotaltax(response.data.result.order.totaltax);
          setDeliveryCharges(response.data.result.order.deliveryCharges);
        } else {
          addToast(response.data.message, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .catch((err) => console.log('error ->', err));
  };
  const handleChange5 = (name) => (event) => {
    setAddress2({ ...address2, error: false, [name]: event.target.value });
    if (address2.pincode2.length == 5) {
      setDismiss1(false);
    }
  };
  // const { pathname } = location;
  const handleSubmit5 = async (event) => {
    event.preventDefault();
    setAddress2({ ...address2 });
    setShow22(false)
    if (add === true && paymentmode === 'paypal') {
      let obj = {
        type: 'cod',
        couponDiscount: disco,
        address: address,
        billing_address: address2,
        paymentMode: 'cod',
      };

      return fetchApi('/userdash/stockcheck', obj, {}, true, 'post')
        .then((response) => {
          if (response.data.message === 'Access denied') {
            addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                    
             setTimeout(function(){  signout(() => { }) }, 2000);
          }
          if (response.data.message === 'success') {
            let obj = {
              type: 'cod',
              couponDiscount: disco,
              address: address,

            };
            localStorage.setItem('order', JSON.stringify(obj));

            var apiKey = 'fkmfkfmfkkf';
            var apiSecret = 'dndndndn';
            var itemName = 'rohan';
            var itemCost = grandTotal; // subtotal #1
            // this.setState({chipStatus:'Creating payment...', chipIndicator:'loading'})
            // console.log(itemName);
            var redirectURL =
              'http://mini-new-york.s3-website.us-east-2.amazonaws.com/checkout';
            var create_payment_json = {
              intent: 'sale',
              payer: {
                payment_method: 'paypal',
              },
              redirect_urls: {
                return_url: redirectURL,
                cancel_url:
                  'http://mini-new-york.s3-website.us-east-2.amazonaws.com/cancelorder',
              },
              transactions: [
                {
                  item_list: {
                    items: [
                      {
                        name: itemName || 'Default Item',
                        sku: 'item',
                        price: itemCost || '2.00',
                        currency: 'USD',
                        quantity: 1,
                      },
                    ],
                  },
                  amount: {
                    currency: 'USD',
                    total: itemCost || '2.00',
                  },
                  description: 'This is the payment description.',
                },
              ],
            };
            var data = {
              payment: create_payment_json,
              apiCredentials: {
                key: 'AS2JOhekdlepTqfe9BDFIQsU8cXje1',
                secret:
                  'EMqYYUIRs2jcgoDDl3RPfOiaDuYyJyQ_ZnmGkciX1aFidQw-Rlglmjh24u9Jvba7AGHReb83DMNoeX9A',
              },
              redirectUrl: redirectURL,
            };
            var url = '/api/create-payment';
            fetchApi('/paypal/api/create-payment', data, {}, false, 'post')
              .then((response) => {
                window.location = response.data.links[1].href;
              })
              .catch((err) => console.log('error ->', err));
          } else {
            addToast(response.data.message, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        })
        .catch((err) => console.log('error ->', err));
      //       let obj = {
      //         type: "cod",
      //         couponDiscount: disco,
      //         "address": address

      //       };
      // localStorage.setItem("order",JSON.stringify(obj))

      // var apiKey = "fkmfkfmfkkf"
      //     var apiSecret = "dndndndn"
      //     var itemName = "rohan"
      //     var itemCost = "2.00" // subtotal #1
      //     // this.setState({chipStatus:'Creating payment...', chipIndicator:'loading'})
      //     // console.log(itemName);
      //     // console.log(itemCost);
      //     var redirectURL = "http://localhost/checkout"
      //     var create_payment_json = {
      // 			"intent": "sale",
      // 			"payer": {
      // 					"payment_method": "paypal"
      // 			},
      // 			"redirect_urls": {
      // 					"return_url": redirectURL,
      // 					"cancel_url": "http://localhost/cancelorder"
      // 			},
      // 			"transactions": [{
      // 					"item_list": {
      // 							"items": [{
      // 									"name": itemName || "Default Item",
      // 									"sku": "item",
      // 									"price": itemCost || "2.00",
      // 									"currency": "USD",
      // 									"quantity": 1
      // 							}]
      // 					},
      // 					"amount": {
      // 							"currency": "USD",
      // 							"total": itemCost || "2.00"
      // 					},
      // 					"description": "This is the payment description."
      // 			}]
      // 		};
      //     var data = {payment:create_payment_json, apiCredentials: {key:"AS2JOhekdlepTqfe9BDFIQsU8cXje1", secret:"EMqYYUIRs2jcgoDDl3RPfOiaDuYyJyQ_ZnmGkciX1aFidQw-Rlglmjh24u9Jvba7AGHReb83DMNoeX9A"}, redirectUrl: redirectURL}
      //     var url ='/api/create-payment'
      //     fetchApi("/paypal/api/create-payment", data, {}, false, "post")
      //       .then((response) => {
      //         console.log("Response Craete Payment", response.data);
      //         window.location = response.data.links[1].href;
      //       })
      //       .catch((err) => console.log("error ->", err));
    } else if (add === true) {

      if (quick[0].codAvailable == false) {
        addToast("cod not available for" + " " + quick[0].productName, {
          appearance: 'error',
          autoDismiss: true,
        });
        return 0
      }

      let obj1 = {
        zipcode: address.pincode,

      };


      return fetchApi("/zip/findZip", obj1, {}, true, "post")
        .then((response) => {
          // console.log("Response", response.data.message);
          if (response.data.success == true) {
            var available = true;
            for (var i = 0; i < quick.length; i++) {
              var productIndex = response.data.product.findIndex(x => x === quick[i].productId);
              if (productIndex == -1) {
                addToast("Product" + " " + quick[i].title + " " + "unavailable for selected pincode", { appearance: "error", autoDismiss: true });
                available = false
              }
            }
            if (available == true) {
              let obj = {
                type: 'cod',
                couponDiscount: disco,
                address: address,
                useCredits: checked,
                billing_address: {
                  fullname: localStorage.getItem("fullname"),
                  country: address2.country2,
                  pincode: address2.pincode2,
                  state: address2.state2,
                  city: address2.city2,
                  area: address2.area2



                },

                mobile: mobile,
                paymentMode: 'cod',
              };

              return fetchApi('/userdash/buyNow', obj, {}, true, 'post')
                .then((response) => {
                  if (response.data.message === 'Access denied') {
                    addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                            
                     setTimeout(function(){  signout(() => { }) }, 2000);
                  }
                  // console.log("Response", response.data);
                  if (response.data.message === 'success') {
                    // dispatch(fetchcarts(addToast));

                    addToast('Order Placed', {
                      appearance: 'success',
                      autoDismiss: true,
                    });
                    setorderid(response.data.txnId);
                    setShow1(true);
                  } else {
                    addToast(response.data.message, {
                      appearance: 'error',
                      autoDismiss: true,
                    });
                  }
                })
                .catch((err) => console.log('error ->', err));
            }

            // addToast("Address Added Successfully", { appearance: "success", autoDismiss: true });
            // init1();
          } else {
            addToast(response.data.message, { appearance: "error", autoDismiss: true });
          }
        })
        .catch((err) => console.log("error ->", err));

    }


  };
  // const checkout = () => {
  //   console.log("rohan", mobile)
  //   if (mobile == undefined) {
  //     addToast('Please update mobile', {
  //       appearance: 'warning',
  //       autoDismiss: true,
  //     });
  //     return 0
  //   }
  //   if (checked1 == false && add == true) {
  //     console.log("rojma")
  //     setShow22(true)
  //     return 0
  //   }
  //   if (add === false) {
  //     addToast('Please Select or Add address', {
  //       appearance: 'success',
  //       autoDismiss: true,
  //     });
  //   }
  //   if (add === true && paymentmode === 'paypal') {
  //     let obj = {
  //       type: 'cod',
  //       couponDiscount: disco,
  //       address: address,
  //       paymentMode: 'cod',
  //     };

  //     return fetchApi('/userdash/stockcheck', obj, {}, true, 'post')
  //       .then((response) => {
  //         console.log('Response Stock Check', response.data.message);
  //         if (response.data.message === 'success') {
  //           let obj = {
  //             type: 'cod',
  //             couponDiscount: disco,
  //             address: address,
  //           };
  //           localStorage.setItem('order', JSON.stringify(obj));

  //           var apiKey = 'fkmfkfmfkkf';
  //           var apiSecret = 'dndndndn';
  //           var itemName = 'rohan';
  //           var itemCost = grandTotal; // subtotal #1
  //           // this.setState({chipStatus:'Creating payment...', chipIndicator:'loading'})
  //           // console.log(itemName);
  //           console.log('itemCost ----->', subtotal);
  //           var redirectURL =
  //             'http://mini-new-york.s3-website.us-east-2.amazonaws.com/checkout';
  //           var create_payment_json = {
  //             intent: 'sale',
  //             payer: {
  //               payment_method: 'paypal',
  //             },
  //             redirect_urls: {
  //               return_url: redirectURL,
  //               cancel_url:
  //                 'http://mini-new-york.s3-website.us-east-2.amazonaws.com/cancelorder',
  //             },
  //             transactions: [
  //               {
  //                 item_list: {
  //                   items: [
  //                     {
  //                       name: itemName || 'Default Item',
  //                       sku: 'item',
  //                       price: itemCost || '2.00',
  //                       currency: 'USD',
  //                       quantity: 1,
  //                     },
  //                   ],
  //                 },
  //                 amount: {
  //                   currency: 'USD',
  //                   total: itemCost || '2.00',
  //                 },
  //                 description: 'This is the payment description.',
  //               },
  //             ],
  //           };
  //           var data = {
  //             payment: create_payment_json,
  //             apiCredentials: {
  //               key: 'AS2JOhekdlepTqfe9BDFIQsU8cXje1',
  //               secret:
  //                 'EMqYYUIRs2jcgoDDl3RPfOiaDuYyJyQ_ZnmGkciX1aFidQw-Rlglmjh24u9Jvba7AGHReb83DMNoeX9A',
  //             },
  //             redirectUrl: redirectURL,
  //           };
  //           var url = '/api/create-payment';
  //           fetchApi('/paypal/api/create-payment', data, {}, false, 'post')
  //             .then((response) => {
  //               console.log('Response Craete Payment', response.data);
  //               window.location = response.data.links[1].href;
  //             })
  //             .catch((err) => console.log('error ->', err));
  //         } else {
  //           addToast(response.data.message, {
  //             appearance: 'error',
  //             autoDismiss: true,
  //           });
  //         }
  //       })
  //       .catch((err) => console.log('error ->', err));
  //     //       let obj = {
  //     //         type: "cod",
  //     //         couponDiscount: disco,
  //     //         "address": address

  //     //       };
  //     // localStorage.setItem("order",JSON.stringify(obj))

  //     // var apiKey = "fkmfkfmfkkf"
  //     //     var apiSecret = "dndndndn"
  //     //     var itemName = "rohan"
  //     //     var itemCost = "2.00" // subtotal #1
  //     //     // this.setState({chipStatus:'Creating payment...', chipIndicator:'loading'})
  //     //     // console.log(itemName);
  //     //     // console.log(itemCost);
  //     //     var redirectURL = "http://localhost/checkout"
  //     //     var create_payment_json = {
  //     // 			"intent": "sale",
  //     // 			"payer": {
  //     // 					"payment_method": "paypal"
  //     // 			},
  //     // 			"redirect_urls": {
  //     // 					"return_url": redirectURL,
  //     // 					"cancel_url": "http://localhost/cancelorder"
  //     // 			},
  //     // 			"transactions": [{
  //     // 					"item_list": {
  //     // 							"items": [{
  //     // 									"name": itemName || "Default Item",
  //     // 									"sku": "item",
  //     // 									"price": itemCost || "2.00",
  //     // 									"currency": "USD",
  //     // 									"quantity": 1
  //     // 							}]
  //     // 					},
  //     // 					"amount": {
  //     // 							"currency": "USD",
  //     // 							"total": itemCost || "2.00"
  //     // 					},
  //     // 					"description": "This is the payment description."
  //     // 			}]
  //     // 		};
  //     //     var data = {payment:create_payment_json, apiCredentials: {key:"AS2JOhekdlepTqfe9BDFIQsU8cXje1", secret:"EMqYYUIRs2jcgoDDl3RPfOiaDuYyJyQ_ZnmGkciX1aFidQw-Rlglmjh24u9Jvba7AGHReb83DMNoeX9A"}, redirectUrl: redirectURL}
  //     //     var url ='/api/create-payment'
  //     //     fetchApi("/paypal/api/create-payment", data, {}, false, "post")
  //     //       .then((response) => {
  //     //         console.log("Response Craete Payment", response.data);
  //     //         window.location = response.data.links[1].href;
  //     //       })
  //     //       .catch((err) => console.log("error ->", err));
  //   } else if (add === true) {

  //     let obj1 = {
  //       zipcode: address.pincode,

  //     };


  //     return fetchApi("/zip/findZip", obj1, {}, true, "post")
  //       .then((response) => {
  //         // console.log("Response", response.data.message);
  //         if (response.data.success == true) {
  //           var available = true;
  //           for (var i = 0; i < dataReducer.cartItems1.length; i++) {
  //             console.log("rjha", dataReducer.cartItems1[i].title)
  //             var productIndex = response.data.product.findIndex(x => x === dataReducer.cartItems1[i].productId);
  //             if (productIndex == -1) {
  //               addToast("Product" + " " + dataReducer.cartItems1[i].title + " " + "unavailable for selected pincode", { appearance: "error", autoDismiss: true });
  //               available = false
  //             }
  //           }
  //           if (available == true) {
  //             let obj = {
  //               type: 'cod',
  //               couponDiscount: disco,
  //               address: address,
  //               billing_address: address,
  //               useCredits: checked,
  //               mobile: mobile,
  //               paymentMode: 'cod',
  //             };

  //             return fetchApi('/userdash/buyNow', obj, {}, true, 'post')
  //               .then((response) => {
  //                 // console.log("Response", response.data);
  //                 if (response.data.message === 'success') {
  //                   dispatch(fetchcarts(addToast));

  //                   addToast('Order Placed', {
  //                     appearance: 'success',
  //                     autoDismiss: true,
  //                   });
  //                   setorderid(response.data.txnId);
  //                   setShow1(true);
  //                 } else {
  //                   addToast(response.data.message, {
  //                     appearance: 'error',
  //                     autoDismiss: true,
  //                   });
  //                 }
  //               })
  //               .catch((err) => console.log('error ->', err));
  //           }

  //           // addToast("Address Added Successfully", { appearance: "success", autoDismiss: true });
  //           // init1();
  //         } else {
  //           addToast(response.data.message, { appearance: "error", autoDismiss: true });
  //         }
  //       })
  //       .catch((err) => console.log("error ->", err));

  //   }
  // };
  const checkout = () => {
    init12()
    if (add === false) {
      addToast('Please Select or Add address', {
        appearance: 'success',
        autoDismiss: true,
      });
    }
    if (billerror == false && checked1 == false) {
      addToast('Please update billing address', {
        appearance: 'warning',
        autoDismiss: true,
      });
      return 0
    }

 
    if (add === true && paymentmode === 'paypal') {
       setloader(true)
       setbuttondisable(true)
            
                    let obj = {
                      type: 'cod',
                      couponDiscount: disco,
                      address: address,
                      useCredits: checked,
                      mobile:mobilenumber,

                      billing_address: billerror == true ? {
                        area: address2.area2,
                        city: address2.city2,
                        state: address2.state2,
                        firstName: address2.firstName2,
                        pincode: address2.pincode2,
                        lastName: address2.lastName2
                      } : address,
                      email: localStorage.getItem("useremail"),
                      total: grandTotal,
                      userId: localStorage.getItem("userId"),
                      orderType:"buynow"

                    };

                    localStorage.setItem("order",JSON.stringify(obj))
                    makePayment();
      //  handleClick()

      //       let obj = {
      //         type: "cod",
      //         couponDiscount: disco,
      //         "address": address

      //       };
      // localStorage.setItem("order",JSON.stringify(obj))

      // var apiKey = "fkmfkfmfkkf"
      //     var apiSecret = "dndndndn"
      //     var itemName = "rohan"
      //     var itemCost = "2.00" // subtotal #1
      //     // this.setState({chipStatus:'Creating payment...', chipIndicator:'loading'})
      //     // console.log(itemName);
      //     // console.log(itemCost);
      //     var redirectURL = "http://localhost/checkout"
      //     var create_payment_json = {
      // 			"intent": "sale",
      // 			"payer": {
      // 					"payment_method": "paypal"
      // 			},
      // 			"redirect_urls": {
      // 					"return_url": redirectURL,
      // 					"cancel_url": "http://localhost/cancelorder"
      // 			},
      // 			"transactions": [{
      // 					"item_list": {
      // 							"items": [{
      // 									"name": itemName || "Default Item",
      // 									"sku": "item",
      // 									"price": itemCost || "2.00",
      // 									"currency": "USD",
      // 									"quantity": 1
      // 							}]
      // 					},
      // 					"amount": {
      // 							"currency": "USD",
      // 							"total": itemCost || "2.00"
      // 					},
      // 					"description": "This is the payment description."
      // 			}]
      // 		};
      //     var data = {payment:create_payment_json, apiCredentials: {key:"AS2JOhekdlepTqfe9BDFIQsU8cXje1", secret:"EMqYYUIRs2jcgoDDl3RPfOiaDuYyJyQ_ZnmGkciX1aFidQw-Rlglmjh24u9Jvba7AGHReb83DMNoeX9A"}, redirectUrl: redirectURL}
      //     var url ='/api/create-payment'
      //     fetchApi("/paypal/api/create-payment", data, {}, false, "post")
      //       .then((response) => {
      //         console.log("Response Craete Payment", response.data);
      //         window.location = response.data.links[1].href;
      //       })
      //       .catch((err) => console.log("error ->", err));
    } else if (add === true) {
      if (quick[0].codAvailable == false) {
        addToast("cod not available for" + " " + quick[0].title, {
          appearance: 'error',
          autoDismiss: true,
        });
        return 0
      }

      //  for(var i=0;i<dataReducer.cartItems1.length;i++)
      //  {
      //    if(dataReducer.cartItems1[i].codAvailable==false)
      //    {
      //     addToast("cod not available for"+" "+dataReducer.cartItems1[i].title, {
      //       appearance: 'error',
      //       autoDismiss: true,
      //     });
      //     return 0
      //    }
      //  }
      let obj1 = {
        zipcode: address.pincode,

      };


      return fetchApi("/zip/findZip", obj1, {}, true, "post")
        .then((response) => {
          // console.log("Response", response.data.message);
          if (response.data.success == true) {
            var available = true;
            for (var i = 0; i < quick.length; i++) {
              var productIndex = response.data.product.findIndex(x => x === quick[i].productId);
              if (productIndex == -1) {
                addToast("Product" + " " + quick[i].title + " " + "unavailable for selected pincode", { appearance: "error", autoDismiss: true });
                available = false
              }
            }
            if (available == true) {
              let obj = {
                type: 'cod',
                couponDiscount: disco,
                address: address,
                billing_address: billerror == true ? {
                  area: address2.area2,
                  city: address2.city2,
                  state: address2.state2,
                  firstName: address2.firstName2,
                  pincode: address2.pincode2,
                  lastName: address2.lastName2
                } : address,
                useCredits: checked,
                mobile: mobile,
                paymentMode: 'cod',
              };

              return fetchApi('/userdash/buyNow', obj, {}, true, 'post')
                .then((response) => {
                  // console.log("Response", response.data);
                  if (response.data.message === 'success') {
                    dispatch(fetchcarts(addToast));

                    addToast('Order Placed', {
                      appearance: 'success',
                      autoDismiss: true,
                    });
                    setorderid(response.data.txnId);
                    setShow1(true);
                  } else {
                    addToast(response.data.message, {
                      appearance: 'error',
                      autoDismiss: true,
                    });
                  }
                })
                .catch((err) => console.log('error ->', err));
            }

            // addToast("Address Added Successfully", { appearance: "success", autoDismiss: true });
            // init1();
          } else {
            addToast(response.data.message, { appearance: "error", autoDismiss: true });
          }
        })
        .catch((err) => console.log("error ->", err));

    }
  };
  const init2 = async () => {
    let obj = {
      "voucherDate": "rohan",
      "expiryDate": "rohan"
    }
    var arr = []
    return fetchApi('/voucher/loadVoucher', obj, {}, false, 'post')
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        // console.log("Response Voucher", response.data.vouchers.result);
        if (response.data.vouchers.result.length >= 0) {
          for (var i = 0; i < response.data.vouchers.result.length; i++) {
            if (response.data.vouchers.result[i].expired == false) {
              arr.push(response.data.vouchers.result[i])
            }
          }

          setVouchers(arr);
        } else {
          // addToast(response.data.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((err) => console.log('error ->', err));
  };
  const handleSubmit3 = (event) => {
    // event.preventDefault();
    // setProfile({ ...profile });

    let obj = {
      userEmail: email,
    };

    return fetchApi("/sendEmailActivationLink", obj, {}, true, "post")
      .then((response) => {
        if (response.data.message === 'Access denied') {
          addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                  
           setTimeout(function(){  signout(() => { }) }, 2000);
        }
        if (response.data.message === "success") {
          // localStorage.setItem("userEmail", profile.username);
          // seterror1("Email activation link sent successfully to your email.Please click on that link to verify your email")
          addToast("Email activation link sent successfully to your email.Please click on that link to verify your email", { appearance: "success", autoDismiss: true });
          setShow4(false)
          // init();
        } else {
          addToast(response.data.message, { appearance: "error", autoDismiss: true });
        }
      })
      .catch((err) => console.log("error ->", err));
  };
  const updatePrice = () => {
    let obj = {
      type: 'cod',
      couponDiscount: disco,
    };

    return fetchApi('/userdash/cartPrice', obj, {}, true, 'post')
      .then((response) => {
        if (response.data.result !== null) {
          setsubtotal(response.data.result.order.total);
          setGrandTotal(response.data.result.order.grandTotal);
          setTotalDiscount(disco);
          setTotaltax(response.data.result.order.totaltax);
          setDeliveryCharges(response.data.result.order.deliveryCharges);
        } else {
          addToast(response.data.message, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .catch((err) => console.log('error ->', err));
  };

  const dispatch1 = (cartItem) => {
    dispatch(
      updateCart(
        cartItem.productId,
        cartItem.variantId,
        cartItem.quantity + 1,
        addToast,
        disco
      )
    );
  };
  const dispatch2 = (cartItem) => {
    dispatch(
      updateCart(
        cartItem.productId,
        cartItem.variantId,
        cartItem.quantity - 1,
        addToast,
        disco
      )
    );
  };
  useEffect(() => {

    init12();
    init1();
    init32();
    init2();
    init3();
    init202();
  }, []);

  const handleChange4 = (name) => (event) => {
    setAddress1({ ...address1, error: false, [name]: event.target.value });
    if (address1.pincode1.length == 5) {
      setDismiss(false);
    }
  };

  const [zipError, setZipError] = useState("");
  const handleSubmit4 = (event) => {
    event.preventDefault();
    setAddress1({ ...address1 });

    if (address1.pincode1.length === 6) {

      let obj = {
        firstName: address1.firstName1,
        lastName: address1.lastName1,
        area: address1.area1,
        city:selectedOption1.label,
        state: selectedOption.label,
        pincode: parseInt(address1.pincode1),
        country: "India",
      };

      return fetchApi('/profile/addAddress', obj, {}, true, 'post')
        .then((response) => {
          if (response.data.message === 'Access denied') {
            addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                    
             setTimeout(function(){  signout(() => { }) }, 2000);
          }
          if (response.data.message === 'success') {
            init3();
            addToast('Address Added Successfully', {
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

    } else {
      setZipError("Pincode Should be 6 digits!")
    }

  };

  const paypal = () => {
    setPaymentMode('paypal');
    setpaymentbgcolor(!paymentbgcolor);
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Utsav Plasto Tech | Buy Now</title>
        <meta
          name='description'
          content='Utsav Plasto Tech Buy Now'
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Buy Now
      </BreadcrumbsItem>

      {redirectHome()}
      {loader?(<div className='flone-preloader-wrapper'>
      <span className="mr-20" style={{  "position":"absolute",
    "height": window.innerHeight ,
    "width": window.innerWidth,

    "left":"50%",
    // "top":"50%",
    "marginTop":"50px" ,
    "marginLeft":- (window.innerHeight/3) }}>Please Do Not Reload or Navigate From this page</span>
      <span style={{  "position":"absolute",
    "height": window.innerHeight ,
    "width": window.innerWidth,

    "left":"50%",
    // "top":"50%",
    "marginTop":"30px" ,
    "marginLeft":- window.innerHeight/3 }}>Please Wait While We Process  Your Order</span>

            <div className='flone-preloader'>
              <span></span>
              <span></span>
            </div>
          </div>):null}
      <LayoutOne headerTop='visible'>
        {/* breadcrumb */}
        <Breadcrumb />
        <Modal show={show4} onHide={handleClose44}>
          <Modal.Header closeButton>
            <Modal.Title> Update Email</Modal.Title>
          </Modal.Header>
          {/* <form onSubmit={handleSubmit3}> */}
          <Modal.Body>
            <div className='row'>


              <div className='col-lg-12 col-md-12'>
                <div className='billing-info'>
                  <label>Email</label>
                  <input
                    type='email'
                    value={email}
                    required={true}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
              </div>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose44}>
              Close
            </Button>
            <Button variant='primary' type='submit' onClick={handleSubmit3}>
              Send Link
            </Button>
          </Modal.Footer>
          {/* </form> */}
        </Modal>
        <Modal show={show22} onHide={handleClose22}>
          <Modal.Header closeButton>
            <Modal.Title> Enter Billing Address</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit5}>
            <Modal.Body>
              <div className='row'>
                <div className='col-lg-12 col-md-12'>
                  <div className='billing-info'>
                    <label>Address Line 1</label>
                    <textarea
                      type='text'
                      value={area2}
                      onChange={handleChange5('area2')}
                    />
                  </div>
                </div>
                <div className='col-lg-6 col-md-6'>
                  <div className='billing-info'>
                    <label>City</label>
                    <input
                      type='text'
                      value={city2}
                      onChange={handleChange5('city2')}
                    />
                  </div>
                </div>
                <div className='col-lg-6 col-md-6'>
                  <div className='billing-info'>
                    <label>State</label>
                    <input
                      type='text'
                      value={state2}
                      onChange={handleChange5('state2')}
                    />
                  </div>
                </div>
                <div className='col-lg-6 col-md-6'>
                  <div className='billing-info'>
                    <label>Pincode</label>
                    <input
                      type='number'
                      value={pincode2}
                      onChange={handleChange5('pincode2')}
                    />
                  </div>
                </div>
                <div className='col-lg-6 col-md-6'>
                  <div className='billing-info'>
                    <label>Country</label>
                    <input
                      type='text'
                      value={country2}
                      onChange={handleChange5('country2')}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose22}>
                Close
            </Button>
              <Button variant='primary' type='submit' onClick={handleClose22}>
                Save Changes
            </Button>
            </Modal.Footer>
          </form>
        </Modal>
        <div className='cart-main-area pt-90 pb-100'>
          <div className='container'>
            {disable == false ? (
              <Fragment>
                <h3 className='cart-page-title'>Your cart items</h3>
                <div className='row'>
                  <div className='col-12'>
                    <div className='table-content table-responsive cart-table-content'>
                      <table>
                      {quick.length > 0 ?(<thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>) :null}
                        <tbody>
                          {quick.length > 0 &&
                            quick.map((cartItem, key) => {
                              return (
                                <tr key={key}>
                                  <td className='product-thumbnail'>
                                    <Link
                                      to={
                                        process.env.PUBLIC_URL +
                                        '/product/' +
                                        cartItem.slug
                                      }
                                    >
                                      {cartItem.imageUrls.length > 0 ? (
                                        <img
                                        style={{height:"92px",
                                        objectFit:"contain"}}
                                          src={`https://api.utsavplastotech.com${cartItem.imageUrls[0]}`}
                                          alt=''
                                          className='img-fluid'
                                        />
                                      ) : (
                                          <img style={{ width: "100%" }}
                                            src={
                                              process.env.PUBLIC_URL +
                                              '/assets/img/externalimages/no-image-available.jpg'
                                            }
                                            alt='false-image'
                                            className='default-img'
                                          />
                                        )}
                                    </Link>
                                  </td>

                                  <td className='product-name'>
                                    <Link
                                      to={
                                        process.env.PUBLIC_URL +
                                        '/product/' +
                                        cartItem.slug
                                      }
                                    >
                                      {cartItem.title}
                                    </Link>
                                    {cartItem.variant1.value != undefined ? (
                                      <div className='cart-item-variation'>
                                        <span>
                                          Weight: {cartItem.variant1.value.split('(')[0]}
                                        </span>
                                      </div>
                                    ) : (
                                        ''
                                      )}
                                    {cartItem.variant2.value != undefined ? (
                                      <div className='cart-item-variation'>
                                        <span>
                                          Size: {cartItem.variant2.value}
                                        </span>
                                      </div>
                                    ) : (
                                        ''
                                      )}
                                  </td>

                                  <td className='product-price-cart'>
                                    {cartItem.price !== null ? (
                                      <Fragment>
                                        <span>₹
{cartItem.price}</span>
                                      </Fragment>
                                    ) : (
                                        ' '
                                      )}
                                  </td>

                                  <td className='product-quantity'>
                                   
                                     
                                      {cartItem.quantity}
                                   
                                  </td>
                                  <td className='product-subtotal'>
                                    ₹

                                    {cartItem.price !== null
                                      ? parseFloat(cartItem.price * cartItem.quantity).toFixed(2)
                                      : ' '}
                                  </td>

                                
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='cart-shiping-update-wrapper'>
                      <div className="row justify-content-between">
                        <div className="col-md-5">
                          <div className='cart-shiping-update'>
                            <Link style={{ backgroundColor: 'rgb(0, 41, 95)', color: '#fff' }} to={process.env.PUBLIC_URL + '/shop?page=1'}>
                              Continue Shopping
                        </Link>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <h5 style={{ marginLeft: '32%' }} className='text-capitalize'>
                            select payment option{' '}
                          </h5>
                          <div style={{ marginLeft: "140px" }} className="row">

                            <FormControl component="fieldset" className="my-1 text-light-dark">
                              {/* <p className="text-dark">Shipping Cost</p> */}
                              <RadioGroup aria-label="shipping" className="d-inline text-dark" name="shipping" value={paymentmode} onChange={handleChangre}>
                              {/* {quick.length>0&&quick[0].codAvailable?(<FormControlLabel value="cod" control={<Radio />} label="COD" />):null}   */}
                                <img src="/assets/img/banner/paytm.jpg" alt="" width="150" height="40" />
                                <FormControlLabel value="paypal" control={<Radio />} />
                              </RadioGroup>
                            </FormControl>
                            {/* <div className="col-md-4 col-12">
                            </div>
                            <div className="col-md-5 col-12 ml-0 pl-0 d-flex">
                              <img src="/assets/img/icon-img/payoption.png" alt="" width="150" height="40" />
                              <input style={{ width: 20 }} name="payment" id="CCAVENUE" value="CCAVENUE" type="radio" ></input>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-lg-4 col-md-6'>
                    <ul className='list-group'>
                      {addresses.length > 0 ? (
                        <div>
                          <h5>Select One of the following Shipping Address</h5>
                          {addresses.map((p, i) => (
                            <li key={p._id}>
                              <Accordion defaultActiveKey='0'>
                                <Card className='single-my-account mb-20'>
                                  <Card.Header className='panel-heading'>
                                    <Accordion.Toggle
                                      variant='link'
                                      eventKey='4'
                                    >
                                      <h3 className='panel-title address-input-button'>
                                        <input
                                          onChange={() => handleToggle(p)}
                                          type='radio'
                                          name='radio1'
                                          defaultChecked={i === 0}
                                          value={p}
                                        />
                                        {p.firstName + " " + p.lastName}
                                      </h3>
                                    </Accordion.Toggle>
                                  </Card.Header>
                                  <Accordion.Collapse eventKey='4'>
                                    {/* <Card.Body> */}
                                    <div className='myaccount-info-wrapper'>
                                      <div className='row'>
                                        <div className='col-lg-12 col-md-12'>
                                          <div className='billing-info'>
                                            <table class='table table-borderless'>
                                              <tbody>
                                                <tr>
                                                  <th scope='row'>First Name</th>
                                                  <td>{p.firstName}</td>
                                                </tr>
                                                <tr>
                                                  <th scope='row'>Last Name</th>
                                                  <td>{p.lastName}</td>
                                                </tr>
                                                <tr>
                                                  <th scope='row'>Area</th>
                                                  <td>{p.area}</td>
                                                </tr>
                                                <tr>
                                                  <th scope='row'>State</th>
                                                  <td>{p.state}</td>
                                                </tr>
                                                <tr>
                                                  <th scope='row'>City</th>
                                                  <td>{p.city}</td>
                                                </tr>

                                                <tr>
                                                  <th scope='row'>Pin Code</th>
                                                  <td>{p.pincode}</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Accordion.Collapse>
                                </Card>
                              </Accordion>
                            </li>
                          ))}
                        </div>
                      ) : (
                          <div className='myaccount-info-wrapper'>
                            <form onSubmit={handleSubmit4}>
                              <div className='row'>
                                <div className='col-lg-12 col-md-12'>
                                  <div className='billing-info'>
                                    <label>Area</label>
                                    <textarea
                                      type='text'
                                      value={area1}
                                      required={true}
                                      onChange={handleChange4('area1')}
                                    />
                                  </div>
                                </div>
                                <div className='col-lg-6 col-md-6'>
                                  <div className='billing-info'>
                                    <label>First Name</label>
                                    <input
                                      type='text'
                                      value={firstName1}
                                      required={true}
                                      onChange={handleChange4('firstName1')}
                                    />
                                  </div>
                                </div>
                                <div className='col-lg-6 col-md-6'>
                                  <div className='billing-info'>
                                    <label>Last Name</label>
                                    <input
                                      type='text'
                                      value={lastName1}
                                      required={true}
                                      onChange={handleChange4('lastName1')}
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
                                <div className='col-lg-6 col-md-6'>
                                  <div className='billing-info'>
                                    <label>Pincode</label>
                                    <input
                                      type='number'
                                      required={true}
                                      value={pincode1}
                                      onChange={handleChange4('pincode1')}
                                      maxLength="6"
                                      onInput={maxLengthCheck}
                                      onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()}
                                    />
                                    <span style={{ color: '#FC2F25', fontSize: '11px' }}>{pinError}</span>
                                  </div>
                                </div>
                                <div className='col-lg-6 col-md-6'>
                                  <div className='billing-info'>
                                    <label>Country</label>
                                    <input
                                      type='text'
                                      value="India"
                                      // value={country1}
                                      required={true}
                                      readonly
                                    // onChange={handleChange4('country1')}
                                    />
                                  </div>

                                </div>
                                <i style={{ color: '#E01717', marginLeft: 10 }}>{zipError}</i>
                              </div>

                              <Button
                                className='cart-btn-button mt-15'
                                type='submit'
                                // disabled={dismiss}
                                style={{ backgroundColor: 'rgb(0, 41, 95)', color: '#fff' }}
                              >
                                Continue
                        </Button>
                            </form>
                          </div>
                        )}
                    </ul>
                    <div style={{ marginTop: "20px" }} className='row'>

                      <div className='col'>

                        <label style={{ display: "flex" }}>
                          <input type="checkbox" style={{ width: "18px" }}
                            checked={checked1}
                            onChange={() => setChecked1(!checked1)}
                          />
                          <span style={{ lineHeight: '3.2', paddingLeft: '5px', flex: '1' }}>Use shipping address as billing address</span>
                        </label>
                      </div>
                    </div>

                    {!checked1 ?
                      <form onSubmit={handleSubmit555}>
                        <div className='row'>
                          <div className='col-lg-12 col-md-12'>
                            <div className='billing-info'>
                              <label>Address Line 1</label>
                              <textarea
                                type='text'
                                value={area2}
                                required={true}
                                onChange={handleChange5('area2')}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6 col-md-6'>
                            <div className='billing-info'>
                              <label>First Name</label>
                              <input
                                type='text'
                                value={firstName2}
                                required={true}
                                onChange={handleChange5('firstName2')}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6 col-md-6'>
                            <div className='billing-info'>
                              <label>Last Name</label>
                              <input
                                type='text'
                                value={lastName2}
                                required={true}
                                onChange={handleChange5('lastName2')}
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

                          <div className='col-lg-6 col-md-6'>
                            <div className='billing-info'>
                              <label>Pincode</label>
                              <input
                                type='number'
                                value={pincode2}
                                onChange={handleChange5('pincode2')}
                                required={true}
                                maxLength="6"
                                onInput={maxLengthCheck}
                                onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()}
                              />
                            </div>
                          </div>
                          <div className='col-lg-6 col-md-6'>
                            <div className='billing-info'>
                              <label>Country</label>
                              <input
                                type='text'
                                value="India"
                                // value={country2}
                                required={true}
                                readonly
                              // onChange={handleChange5('country2')}
                              />
                            </div>
                          </div>
                          {/* <i style={{ color: '#E01717', marginLeft: 10 }}>{zipError2}</i> */}
                        </div>
                        <Button
                          className='cart-btn-button mt-15'
                          type='submit'
                          // disabled={dismiss1}
                          style={{ backgroundColor: 'rgb(0, 41, 95)', color: '#fff' }}
                        >
                          Continue
                            </Button>
                      </form> : ''}
                  </div>

                  <div
                    className='col-lg-4 col-md-6 col-12'
                  // style={{ display: vouchershow === true ? 'flex' : 'flex' }}
                  >





                    <div className="row">



                      <div className="col-md-12 col-sm-12 col-lg-12 col-6">


                        <div className='discount-code-wrapper'>
                          <div className='title-wrap'>
                            <h4 className='cart-bottom-title section-bg-gray'>
                              Use Coupon Code
                        </h4>
                          </div>
                          <div className='discount-code'>
                            <p>Enter your coupon code if you have one.</p>
                            {vouchershow === false ? (<span>{discount} applied  {message.split("Applied")[1]}
                              <button onClick={() => {
                                setVoucherShow(true)
                                let obj = {
                                  type: 'cod',
                                  couponDiscount: parseInt(0),
                                };

                                return fetchApi('/userdash/quickBuyPrice', obj, {}, true, 'post')
                                  .then((response) => {
                                    if (response.data.message === 'Access denied') {
                                      addToast('Session Expired Please Login Again ', { appearance: 'error', autoDismiss: true });
                                              
                                       setTimeout(function(){  signout(() => { }) }, 2000);
                                    }
                                    if (response.data.result !== null) {
                                      setGrandTotal(response.data.result.order.grandTotal);
                                      setsubtotal(response.data.result.order.total);
                                      setTotalDiscount(response.data.result.order.totaldiscount);
                                      setTotaltax(response.data.result.order.totaltax);
                                      setDeliveryCharges(response.data.result.order.deliveryCharges);
                                    } else {
                                      addToast(response.data.message, {
                                        appearance: 'error',
                                        autoDismiss: true,
                                      });
                                    }
                                  })
                                  .catch((err) => console.log('error ->', err));
                              }} style={{
                                backgroundColor: 'rgb(0, 41, 95)', color: '#fff', position: "absolute",
                                left: "309px",
                                bottom: "48px",
                                width: "18%"
                              }} className='cart-btn-2 mt-10' type='submit'>
                                Remove
                          </button>
                            </span>) : (<form onSubmit={handleSubmit}>
                              <input
                                type='text'
                                required
                                name='name'
                                onChange={handleChange('discount')}
                              />
                              <button style={{ backgroundColor: 'rgb(0, 41, 95)', color: '#fff' }} className='cart-btn-2' type='submit'>
                                Apply Coupon
                          </button>
                            </form>)}
                           
                          </div>
                        </div>






                      </div>




                    {/* </div> */}







                    {/* Referral Code  here*/}
                    {/* <div className="row mt-3"> */}




                      <div className="col-md-12 col-sm-12 col-lg-12 col-6">




                      </div>




                    </div>





                  </div>
                  <div className='col-lg-4 col-md-12'>
                    <div className='grand-totall'>
                      <div className='title-wrap'>
                        <h4 className='cart-bottom-title section-bg-gary-cart'>
                          Cart Total
                        </h4>
                      </div>
                      <h5>
                        <span></span>
                      </h5>
                      <h4 className='grand-totall-title'>
                        Sub Total<span>₹{parseFloat(subtotal + totalDiscount).toFixed(2)}</span>
                      </h4>
                      {totalDiscount > 0 || creditsUsed > 0 ? (<h4 className='grand-totall-title'>
                        Total Discount{' '}
                        <span>₹{totalDiscount != undefined ? (parseFloat(totalDiscount + creditsUsed).toFixed(2)) : null}</span>
                      </h4>) : null}
                      <h4 className='grand-totall-title'>
                        Delivery Charges{' '}
                        <span>₹{devliveryCharges.toFixed(2)}</span>
                      </h4>
                      {creditsUsed != undefined && creditsUsed > 0 ? (<h4 className='grand-totall-title'>
                        Credits {' '}
                        <span>₹{creditsUsed != undefined ? (creditsUsed.toFixed(2)) : null}</span>

                      </h4>) : null}
                      {/* {totalDiscount > 0 ? (<h4 className='grand-totall-title'>
                        {vouchershow == false ? ("Voucher") : ("Referral")}
                        <span>₹{totalDiscount != undefined ? (totalDiscount.toFixed(2)) : null}</span>

                      </h4>) : null} */}

                      {/* <h4 className='grand-totall-title'>
                        Total tax{' '}
                        <span>₹{totaltax.toFixed(2)}</span>
                      </h4> */}

                      {/* <h4 className='grand-totall-title'>
                        Delivery Charges{' '}
                        <span>₹{devliveryCharges.toFixed(2)}</span>
                      </h4> */}
                      <h4 className='grand-totall-title'>
                        Grand Total{' '}
                        <span>₹{grandTotal.toFixed(2)}</span>
                      </h4>
                      <div style={{ marginTop: "20px" }} className='row'>

                      </div>
                      <Button
                        className='cart-btn-button mt-10'
                        onClick={() => checkout()}
                        type='submit'
                        style={{ backgroundColor: 'rgb(0, 41, 95)', color: '#fff' }}
                      >
                        Proceed to Payment
                      </Button>
                    </div>
                    <form style={{ display: "none" }} method="post" name="redirect" id="nonseamless" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction">
                      <input type="text" id="encRequest" name="encRequest" value={enq} />
                      <input type="text" name="access_code" id="access_code" value="AVXR00IA68BP03RXPB" />
                      <input ref={myRefname} type="submit" value="Checkout"></input>
                    </form>
                  </div>
                </div>
              </Fragment>
            ) : (
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='item-empty-area text-center'>
                      <div className='item-empty-area__icon mb-30'>
                        <i className='pe-7s-cart'></i>
                      </div>
                      <div className='item-empty-area__text'>
                        No items found in cart <br />{' '}
                        <Link to={process.env.PUBLIC_URL + '/'}>Shop Now</Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>

          <Modal show={show1} size="sm" onHide={handleClose1} className="modal-custom-style" centred>
            <Modal.Header closeButton>
              <Modal.Title>Your Order has been Placed</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='modal-style'>
                <i class='fa fa-check-circle h1'></i>
                <div className='mt-10'>Order Id: {orderid}</div>
              </div>
            </Modal.Body>
          </Modal>

        </div>
      </LayoutOne>
    </Fragment >
  );
};



export default BuyNow;
