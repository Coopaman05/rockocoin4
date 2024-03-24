const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;
let web3Modal;
let provider;
let selectedAccount;
var vidArray =[];
function getCookie(cval) {
	let cvalue = cval + '=';
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(cvalue) == 0) {
			return c.substring(cvalue.length, c.length);
		}
	}
	return '';
}
function mytoFixed(num, fixed) {
    if(typeof num !="string")
    {
        num = num.toString(); //If it's not already a String
    }
    num = (num.indexOf('.')<0)?num+'.'+'00000000': num+''+'00000000';
    num = num.slice(0, (num.indexOf("."))+fixed+1); //With 3 exposing the hundredths place
    return num;
}
$(document).on('click', '#btn-connect', function (e){
    onConnect();
});
window.addEventListener('load', async () => {
    init();
    $('.onlynumeric').bind('keypress', function(e) {
        var code = e.keyCode || e.which;
        if (code > 31 && (code < 48 || code > 57) || (code == 9)) {
            return false;
        }
        return true;
    });
    var pset = getCookie('pset');
    if((pset!=undefined && pset!=''))
    {
        onConnect();
    }
});

function init() {
    const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              7171: "https://connect.bit-rock.io/",
            },
            chainId: 7171,
            network: 'Bitrock Mainnet',
          },
        },
    };
    web3Modal = new Web3Modal({
		network: 'Bitrock Mainnet',
        cacheProvider: true,
        providerOptions,
        disableInjectedProvider: false
    });
}

async function onConnect() {
    console.log("Opening a dialog", web3Modal);
    try {
        provider = await web3Modal.connect();
        document.cookie = "pset=true";
    } 
    catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }
    await init2();
}

var contractAddress = "0xbc0d769E433b9c806249DB4aeD00d6f832f69454";
var abi = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_stakedToken","internalType":"contract IBEP20"}]},{"type":"event","name":"AdminTokenRecovery","inputs":[{"type":"address","name":"tokenRecovered","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Pause","inputs":[],"anonymous":false},{"type":"event","name":"Unpause","inputs":[],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"Bonus","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"Duration","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IPancakeSwapV2Router02"}],"name":"RockswapV2Router","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"SetMinStakeAmount","inputs":[{"type":"uint256","name":"minStakeAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"SetStakeBonus","inputs":[{"type":"uint256","name":"first","internalType":"uint256"},{"type":"uint256","name":"second","internalType":"uint256"},{"type":"uint256","name":"third","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"SetStakeDuration","inputs":[{"type":"uint256","name":"first","internalType":"uint256"},{"type":"uint256","name":"second","internalType":"uint256"},{"type":"uint256","name":"third","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"package","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"depositNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"emergencyWithdrawTax","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getTotalStaked","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getUserStaking","inputs":[{"type":"address","name":"userAddress","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"}],"name":"getUserStats","inputs":[{"type":"address","name":"userAddress","internalType":"address"},{"type":"uint256","name":"id","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"maxStake","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"minStake","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"pause","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"paused","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverWrongTokens","inputs":[{"type":"address","name":"tokenAddress","internalType":"address"},{"type":"uint256","name":"tokenAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setEmergencyWithdrawTax","inputs":[{"type":"uint256","name":"_newTax","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMaxStakeAmount","inputs":[{"type":"uint256","name":"_maxStakeAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IBEP20"}],"name":"stakedToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalStaked","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"unpause","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"depositNumber","internalType":"uint256"},{"type":"address","name":"tokenAddress","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"depositNumber","internalType":"uint256"}]}];

var TokenContract = '0x55042d507502a703e6cae5ee8534d784155d58a4';
var TokenABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_stakedToken","internalType":"contract IBEP20"}]},{"type":"event","name":"AdminTokenRecovery","inputs":[{"type":"address","name":"tokenRecovered","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Pause","inputs":[],"anonymous":false},{"type":"event","name":"Unpause","inputs":[],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"Bonus","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"Duration","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IPancakeSwapV2Router02"}],"name":"RockswapV2Router","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"SetMinStakeAmount","inputs":[{"type":"uint256","name":"minStakeAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"SetStakeBonus","inputs":[{"type":"uint256","name":"first","internalType":"uint256"},{"type":"uint256","name":"second","internalType":"uint256"},{"type":"uint256","name":"third","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"SetStakeDuration","inputs":[{"type":"uint256","name":"first","internalType":"uint256"},{"type":"uint256","name":"second","internalType":"uint256"},{"type":"uint256","name":"third","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"package","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"depositNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"emergencyWithdrawTax","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getTotalStaked","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getUserStaking","inputs":[{"type":"address","name":"userAddress","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"},{"type":"uint256","name":"","internalType":"uint256"}],"name":"getUserStats","inputs":[{"type":"address","name":"userAddress","internalType":"address"},{"type":"uint256","name":"id","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"maxStake","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"minStake","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"pause","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"paused","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"recoverWrongTokens","inputs":[{"type":"address","name":"tokenAddress","internalType":"address"},{"type":"uint256","name":"tokenAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setEmergencyWithdrawTax","inputs":[{"type":"uint256","name":"_newTax","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMaxStakeAmount","inputs":[{"type":"uint256","name":"_maxStakeAmount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IBEP20"}],"name":"stakedToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalStaked","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"unpause","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"depositNumber","internalType":"uint256"},{"type":"address","name":"tokenAddress","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"depositNumber","internalType":"uint256"}]}];

var userAddress = '';
var contract = undefined;
var tokenInst = undefined;
var minToStake = 0;

// ... [previous code above init2] ...

async function getTotalStaked() {
    try {
        const totalStaked = await contract.methods.getTotalStaked().call();
        const totalStakedFormatted = web3.utils.fromWei(totalStaked, 'ether');
        console.log("Total Staked: ", totalStakedFormatted + " Tokens");

        // Update the UI here
        const totalStakedElement = document.getElementById('totalStakedDisplay');
        if (totalStakedElement) {
            totalStakedElement.textContent = `Total Staked: ${totalStakedFormatted} Tokens`;
        }
    } catch (error) {
        console.error("Error fetching total staked: ", error);
    }
}


async function init2() {
    const web3 = new Web3(provider);
    contract = new web3.eth.Contract(abi, contractAddress);

    web3.eth.getAccounts(function(err, accounts) {
        if (err != null) {
            swal({
                title: "Error Found",
                text: err,
                type: "error",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Ok",
                closeOnConfirm: false
            });
        } else if (accounts.length === 0) {
            swal({
                title: "Error Found",
                text: 'Your Wallet is Locked. Please Unlock It To Use DAPP',
                type: "error",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Ok",
                closeOnConfirm: false
            });
        } else if (web3.currentProvider.chainId != 7171) {
            swal({
                title: "Error Found",
                text: 'Make Sure You Are Using The Bitrock Mainnet Network',
                type: "error",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Ok",
                closeOnConfirm: false
            });
        } else {
            userAddress = accounts[0];
            invest(userAddress);
            loadPackage(userAddress);

            // Call getTotalStaked here after successful setup
            getTotalStaked();

            setInterval(function(){
                invest(userAddress);
            }, 5000);
        }
    });
}

// ... [rest of your existing JavaScript code] ...


function formatDateAndtime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }
function Dateformat(time) {   
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;
    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + "H :" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + "M : " + (secs < 10 ? "0" : "");
    ret += "" + secs+'S';
    return ret;
}

const exponentialToDecimal = exponential => {
    let decimal = exponential.toString().toLowerCase();
    if (decimal.includes('e+')) {
        const exponentialSplitted = decimal.split('e+');
        let postfix = '';
        for (
            let i = 0;
            i <
            +exponentialSplitted[1] -
                (exponentialSplitted[0].includes('.') ? exponentialSplitted[0].split('.')[1].length : 0);
            i++
        ) {
            postfix += '0';
        }
        const addCommas = text => {
            let j = 3;
            let textLength = text.length;
            while (j < textLength) {
                text = `${text.slice(0, textLength - j)},${text.slice(textLength - j, textLength)}`;
                textLength++;
                j += 3 + 1;
            }
            return text;
        };
        decimal = addCommas(exponentialSplitted[0].replace('.', '') + postfix);
    }
    if (decimal.toLowerCase().includes('e-')) {
        const exponentialSplitted = decimal.split('e-');
        let prefix = '0.';
        for (let i = 0; i < +exponentialSplitted[1] - 1; i++) {
            prefix += '0';
        }
        decimal = prefix + exponentialSplitted[0].replace('.', '');
    }
    return decimal;
};
async function loadPackage(userAddress){
    var durationFirst = await contract.methods.Duration(0).call();
    var durationSecond = await contract.methods.Duration(1).call();
    var durationThird = await contract.methods.Duration(2).call();
    var minStakePerUser = await contract.methods.minStake().call();
    
    minToStake = minStakePerUser;
    $("#amountToStake").val(parseInt(minToStake/10**18) );
    durationFirst = durationFirst/(60*60*24);
    durationSecond = durationSecond/(60*60*24);
    durationThird = durationThird/(60*60*24);
    $("#package_id").html(`<option value="0">`+durationFirst+` Day</option>
    <option value="1">`+durationSecond+` Days</option>
    <option value="2">`+durationThird+` Days</option>`);
    var urAcTxt = userAddress.substring(0, 12) + '...'
     var buttnHtml=`<div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        `+urAcTxt+` <i class="fas fa-angle-down"></i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button style="cursor:pointer" class="dropdown-item btnLogout" id="logout">Logout</button>
                        </div>
                    </div>`;
     $("#clb").html(buttnHtml);
     
     $("#stake_Token").show();
}
async function invest(userAddress) 
{
    const web3 = new Web3(provider);
    var pset1 = getCookie('pset');
    if(pset1!=undefined && pset1=='true')
    {
        tokenInst = new web3.eth.Contract(TokenABI, TokenContract);
        var balance = await tokenInst.methods.balanceOf(userAddress).call();
        $("#balance").html((balance/10**18));
        var allowance =await tokenInst.methods.allowance(userAddress,contractAddress).call();
        if(allowance > 0)
        { 
            $("#confirm").show();
            $("#enable_Token").hide();
        }
        else
        {
            $("#enable_Token").show();;
            $("#confirm").hide();
            
        }
        
        var minStakePerUser = await contract.methods.minStake().call();
        minToStake = minStakePerUser;
        $("#min").html(parseInt(minToStake/10**18) + ' ROCKO'); 

        var getuserstacking=await contract.methods.getUserStaking(userAddress).call();
        var totalStackedAmount=0;
        var totalStackedRecentProfit=0;
        //var html=`<div class="myrow">`;
        var html=``;
        if(getuserstacking > 0)
        {
            var i=0;
            var j=0;
            for(i=0;i<getuserstacking;i++)
            {
                getuserstats=await contract.methods.getUserStats(userAddress,i).call();
                var currentDate = new Date();
                var stackAmount = getuserstats[0]/10**18;
                var withdrawnAmount = getuserstats[1]/10**18;
                var rewardAmount = getuserstats[2]/10**18;
                var newStartTime =  new Date(getuserstats[3]*1000);
                var newendTime =  new Date(getuserstats[4]*1000);
                var stackStatus = parseInt(getuserstats[5]);
                var withdrawnTime = parseInt(getuserstats[6]*1000);
                var statusText =stackStatus==1?'Ongoing':'Complete';
                var showing = vidArray.find(element => element == i); //vidArray[]
                var sddshowingClass= showing==i?'show':'';
                if(stackStatus==1)
                {
                        totalStackedAmount+=stackAmount;
                }
                if(currentDate > newendTime && stackStatus ==1)
                {
                        var statButton= `<div class="col-sm-4 pull-right" id="">
                                            <div class="main_box_insm bottom_here">
                                                <div class="clearfix">
                                                    <div class="title">Withdraw</div>
                                                    <button class="btnbtn withdraw" rel="`+i+`"  data-toggle="modal" data-target="#with_ticket">Withdraw</button>
                                                </div>
                                            </div>
                                        </div>`;
                }
                else if(currentDate < newendTime && stackStatus ==1)
                {
                    totalStackedRecentProfit +=rewardAmount;
                    var statButton= `<div class="col-sm-4 pull-right" id="">
                                            <div class="main_box_insm bottom_here">
                                                <div class="clearfix">
                                                    <div class="title">Early Withdraw</div>
                                                    <button class="btnbtn emergwith" rel="`+i+`">Early Withdraw</button>
                                                </div>
                                            </div>
                                        </div>`;
                }
                else
                {
                    var statButton= `<div class="col-sm-4 pull-right" id="">
                                        <div class="main_box_insm bottom_here">
                                            <div class="clearfix">
                                                <div class="title">Status</div>
                                                <button class="btnbtn " disabled="disabled">Claimed</button>
                                            </div>
                                        </div>
                                    </div>`;
                }
                if(j % 3 == 0){
                    html = html+`<div class="row myrow">`;
                }
                html = html+`<div class="single_bb  clearfix `+sddshowingClass+`">
                                <div class="sm_img recc"> <img src="img/heads.png" class="img-responsive" /> </div>
                                <div class="title_bb recc">
                                    <h4>EARN ROCKO</h4>
                                    <p>STAKE ROCKO</p>
                                </div>
                                <div class="recc recc_text clearfix">
                                    <p class="grid_left">Total Staked</p>
                                    <div class="grid_right">
                                        <h4 id="totalStaked">`+stackAmount.toLocaleString()+` ROCKO</h4>
                                    </div>
                                </div>
                                <div class="recc recc_text clearfix">
                                    <p class="grid_left">Start Time</p>
                                    <div class="grid_right">
                                        <h4 id="startTime">`+formatDateAndtime(newStartTime)+`</h4>
                                    </div>
                                </div>
                                <div class="recc recc_text clearfix">
                                    <p class="grid_left">End Time</p>
                                    <div class="grid_right">
                                        <h4 id="endTime">`+formatDateAndtime(newendTime)+`</h4>
                                    </div>
                                </div>
                                <div class="recc recc_text">
                                    <ul class="custom_tabs text-center">
                                        <li class="">
                                            <a href="javascript:void(0)" data-vid='`+i+`'>
                                                <span class="de">Details <i class="fas fa-angle-down"></i></span>
                                                <span class="hi">Hide <i class="fas fa-angle-up"></i></span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div style="clear: both;"></div>
                                <div class="tab-content-custom">
                                    <div id="detail1" class="single_tab" data-id='`+i+`'>
                                        <div class="custom_table">
                                            <div class="clearfix">
                                            <div class="clearfix">
                                                `+statButton+`
                                            
                                                <div class="col-sm-4 pull-right">
                                                    <div class="main_box_insm grid_hide_box">
                                                        <div class="clearfix">
                                                        <div class="title">ROCKO  Earned</div>
                                                        <div class="heightlight" id="TokenEarned">`+rewardAmount.toLocaleString()+`</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4 pull-left">
                                                    <div class="links">
                                                        <p class="clearfix"><a class="pull-left" href="#" target="_blank">See ROCKO Info <i class="fas fa-share-square"></i></a></p>
                                                        <p class="clearfix"><a class="pull-left" href="#" target="_blank">View Project Site <i class="fas fa-share-square"></i></a></p>
                                                        <p class="clearfix"><a class="pull-left" href="#" target="_blank">View Contract <i class="fas fa-share-square"></i></a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                            if(j % 3 == 2){
                                html = html+`</div>`;
                            }           
                            j++;
                                  
            }
            $("#TokenStake").html(totalStackedAmount.toLocaleString());
            $("#pendingReward").html(totalStackedRecentProfit.toLocaleString());
        }
        else
        {
            var showing= vidArray.find(element => element == 0); //vidArray[]
            var sddshowingClass= showing==0?'show':'';
            html = html+`<div class="single_bb  clearfix `+sddshowingClass+`">
                                <div class="sm_img recc"> <img src="img/heads.png" class="img-responsive" /> </div>
                                <div class="title_bb recc">
                                    <h4>EARN ROCKO</h4>
                                    <p>STAKE ROCKO</p>
                                </div>
                                <div class="recc recc_text clearfix">
                                    <p class="grid_left">Total Staked</p>
                                    <div class="grid_right">
                                        <h4 id="totalStaked">0.00 ROCKO</h4>
                                    </div>
                                </div>
                                <div class="recc recc_text clearfix">
                                    <p class="grid_left">Start Time</p>
                                    <div class="grid_right">
                                        <h4 id="startTime">00:00:00 00:00:00</h4>
                                    </div>
                                </div>
                                <div class="recc recc_text clearfix">
                                    <p class="grid_left">End Time</p>
                                    <div class="grid_right">
                                        <h4 id="endTime">00:00:00 00:00:00</h4>
                                    </div>
                                </div>
                                <div class="recc recc_text">
                                    <ul class="custom_tabs text-center">
                                        <li class="">
                                            <a href="javascript:void(0)" data-vid='0'>
                                                <span class="de">Details <i class="fas fa-angle-down"></i></span>
                                                <span class="hi">Hide <i class="fas fa-angle-up"></i></span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div style="clear: both;"></div>
                                <div class="tab-content-custom">
                                    <div id="detail1" class="single_tab" data-id='0'>
                                        <div class="custom_table">
                                            <div class="clearfix">
                                            <div class="clearfix">
                                                
                                                <div class="col-sm-4 pull-right" id="">
                                                    <div class="main_box_insm bottom_here">
                                                    <div class="clearfix">
                                                            <div class="title">Withdraw</div>
                                                            <button class="btnbtn " disabled="disabled">Withdraw</button>
                                                    </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4 pull-right">
                                                    <div class="main_box_insm grid_hide_box">
                                                        <div class="clearfix">
                                                        <div class="title">ROCKO  Earned</div>
                                                        <div class="heightlight" id="TokenEarned">0</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4 pull-left">
                                                    <div class="links">
                                                        <p class="clearfix"><a class="pull-left" href="#" target="_blank">See ROCKO Info <i class="fas fa-share-square"></i></a></p>
                                                        <p class="clearfix"><a class="pull-left" href="#" target="_blank">View Project Site <i class="fas fa-share-square"></i></a></p>
                                                        <p class="clearfix"><a class="pull-left" href="#" target="_blank">View Contract <i class="fas fa-share-square"></i></a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        }
        //html=html+`</div>`
        $("#st_records").html(html);
    }
    
} 
$(document).on('click', '.withdraw', function (e){
    e.preventDefault();
    var id = $(this).attr('rel');
   // withdraw(id);
  // console.log("id=>"+id);
   document.getElementById('widsid').value=id;
}); 
$(document).on('click','#confirmWith',function(e){
    var widsid = document.getElementById('widsid').value;
    var coin_id = document.getElementById('coin_id').value;
    //console.log("widsid=>"+widsid+" coin_id=>"+coin_id);
    if(coin_id==0){ //$ROCKO  
        //withdraw(widsid,'0x55042d507502a703e6cAE5ee8534d784155d58A4');
        withdraw(widsid,'0x0');
    }
    else if(coin_id==1){ // $ROCKO
        withdraw(widsid,'0x55042d507502a703e6cAE5ee8534d784155d58A4');
    }
})
$(document).on('click', '.emergwith', function (e){
    e.preventDefault();
    
    var id = $(this).attr('rel');
    console.log("id=>",id); 
    
    earlywithdraw(id);
});
$("#enable_Token").click(function(e) {
    e.preventDefault();
    enable();
}); 
$("#confirm").click(function(e) {
    e.preventDefault();
    confirmSubmit();
});
async function confirmSubmit() {
    try {
        const web3 = new Web3(provider);
        $('#error').html('');
        var amount = $('#amountToStake').val();
        if(amount==''){
            $('#error').html('Enter Amount To Stake');
            
        }else{
            amount = web3.utils.toWei(amount.replace(/,/g, ''), 'ether');
            var balance = web3.utils.toWei($("#balance").html().replace(/,/g, ''), 'ether');
           
            var pid = document.getElementById('package_id').value; //$('#package_id').val();
            //console.log("pid=>",pid);
           
            /* if(minToStake > amount)
            {
                 $('#error').html('Minimum Token Required To Stake');
            }
            else if(minToStake > balance)
            {
                 $('#error').html('Insufficient Token Balance To Stake');
            } */
            if(parseInt(amount) > parseInt(balance))
            {
                 $('#error').html('Insufficient Token Balance To Stake');
            } 
            else if(parseInt(minToStake) > parseInt(amount))
            {
                 $('#error').html('Minimum Token Required To Stake');
            }
            else
            {
                contract.methods.deposit(web3.utils.toBN(amount),web3.utils.toBN(pid)).send({from: userAddress}, function(error, tx) 
                {
                    if (error) {
                        swal({
                            title: "Error Found",
                            text: error.message,
                            type: "error",
                            showCancelButton: false,
                            confirmButtonClass: "btn-danger",
                            confirmButtonText: "Ok",
                            closeOnConfirm: false
                        });
                    } else {
                        swal({
                            title: "Staking Request Submitted Successfully",
                            text: "Please Wait For Wallet Confirmation",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonClass: "btn-danger",
                            confirmButtonText: "Ok",
                            closeOnConfirm: false
                        });
                    }
                });
                $("#amountToStake").val(0);
                $('#book_ticket').modal('toggle');
            }
        }
    } catch (error) {
        swal({
            title: "Error Found",
            text: error.message,
            type: "error",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Ok",
            closeOnConfirm: false
        });
    }
   
}

$(".percentageCalc").click(function(){
    var percentage = $(this).attr('rel');
    //var balance = $("#balance").html();
    var balance = parseInt($("#balance").html().replace(/,/g, ''));
    if(percentage==3) {
         var amount = ((balance)/4).toFixed(0);
         amount = amount*3;
    }
    else{
         var amount = ((balance)/percentage).toFixed(0);
    }
    $("#amountToStake").val(amount);
});

async function enable() {
    try {
        const web3 = new Web3(provider);
        const etherValue = web3.utils.toWei('100000000000000', 'ether');
        tokenInst.methods.approve(contractAddress, etherValue).send({
            from: userAddress
        }, function(error, tx) {
            if (error) {
                console.log(error);
                swal({
                    title: "Error Found",
                    text: error.message,
                    type: "error",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Ok",
                    closeOnConfirm: false
                });
            } else {
                swal({
                    title: "Token Transactions Approved Successfully",
                    text: "Please Wait For Wallet Confirmation",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Ok",
                    closeOnConfirm: false
                });
            }
        });
    } catch (error) {
        swal({
            title: "Error Found",
            text: error.message,
            type: "error",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Ok",
            closeOnConfirm: false
        });
    }
}

async function withdraw(id,coin_id) {
    try {
        if(coin_id!='0x0'){
            contract.methods.withdraw(id,coin_id).send({
                from: userAddress
            }, function(error, tx) {
                if (error) {
                    console.log(error);
                    swal({
                        title: "Error Found",
                        text: error.message,
                        type: "error",
                        showCancelButton: false,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "Ok",
                        closeOnConfirm: false
                    });
                } else {
                    swal({
                        title: "Token Withdraw Submitted Successfully",
                        text: "Please Wait For Wallet Confirmation",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "Ok",
                        closeOnConfirm: false
                    });
                }
            });
        }
        else{
            contract.methods.withdraw(id).send({
                from: userAddress
            }, function(error, tx) {
                if (error) {
                    console.log(error);
                    swal({
                        title: "Error Found",
                        text: error.message,
                        type: "error",
                        showCancelButton: false,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "Ok",
                        closeOnConfirm: false
                    });
                } else {
                    swal({
                        title: "Token Withdraw Submitted Successfully",
                        text: "Please Wait For Wallet Confirmation",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "Ok",
                        closeOnConfirm: false
                    });
                }
            });
        }
    } catch (error) {
        swal({
            title: "Error Found",
            text: error.message,
            type: "error",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Ok",
            closeOnConfirm: false
        });
    }
}
async function earlywithdraw(id) {
    try {
        contract.methods.emergencyWithdraw(id).send({from: userAddress}, function(error, tx) 
        {
            if (error) {
                //console.log(error);
                swal({
                    title: "Error Found",
                    text: error.message,
                    type: "error",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Ok",
                    closeOnConfirm: false
                });
            } else {
                swal({
                    title: "$ROCKO Claim Submitted Successfully",
                    text: "Please Wait For Wallet Confirmation",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Ok",
                    closeOnConfirm: false
                });
            }
        });
    } catch (error) {
        swal({
            title: "Error Found",
            text: error.message,
            type: "error",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Ok",
            closeOnConfirm: false
        });
    }
}
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function() {
    $(".list_grid_changer .list").click(function() {
        $(this).parent().addClass("list");
        $(this).parent().removeClass("grid");

        $('.list_grid_working').addClass("list");
        $('.list_grid_working').removeClass("grid");
    });
    $(".list_grid_changer .grid").click(function() {
        $(this).parent().addClass("grid");
        $(this).parent().removeClass("list");
        $('.list_grid_working').addClass("grid");
        $('.list_grid_working').removeClass("list");
    });
});

$(document).ready(function() {
    $(".navbar-default .navbar-nav li a.light").click(function() {
        $('body').addClass("light");
        $('body').removeClass("dark");
        $.cookie("body", 'light', {path: '/'});
    });
    $(".navbar-default .navbar-nav li a.dark").click(function() {
        $('body').addClass("dark");
        $('body').removeClass("light");
        $.cookie("body", 'dark', {path: '/'});
    });
});

$(document).ready(function() {
    $(document).on("click",".custom_tabs a", async function() {
        var vid = $(this).attr('data-vid');
        $(this).parent().parent().parent().parent().toggleClass("show");
        var cls = $(this).parent().parent().parent().parent().attr('class').includes("show");
        if(cls){
            vidArray.push(vid);
        }
        else
        {
            var checkvid=vidArray.indexOf(vid);
            if(checkvid>=0){
                console.log("checkvid=>",checkvid)
                for( var i = 0; i < vidArray.length; i++){ 
                    if ( vidArray[i] === vid) { 
                        vidArray.splice(i, 1); 
                    }
                }
            }
        }
    });
    
});

$(document).ready(function() {
    $(".hiff .clickkk").click(function() {
        $(this).parent().parent().toggleClass("show");
    });
});
$(document).ready(function() {
    $('body').addClass("mob_adjust");
    $(".navbar-default .navbar-toggle").click(function() {
        $('body').toggleClass("adjust");
    });
    $(".dropdown").click(function() {
        $('body').addClass("adjust_click");
    });
});

$(document).ready(function() {
    var s = $(".header_area");
    var pos = s.position();

    $(window).scroll(function() {
        var windowpos = $(window).scrollTop();
        if (windowpos >= pos.top & windowpos >= 30) {
            s.addClass("scroll_stick");
        } else {
            s.removeClass("scroll_stick");
        }
    });

});
$(document).on('click', '#logout', async function (e){
    e.preventDefault();
    try {wal
        //provider=null;
        await web3Modal.clearCachedProvider();
        document.cookie = "pset=;max-age=0";
        //window.location.href=window.location.href;

        var html1 = `<div class="single_bb  clearfix">
                        <div class="sm_img recc"> <img src="img/heads.png" class="img-responsive" /> </div>
                        <div class="title_bb recc">
                            <h4>EARN ROCKO</h4>
                            <p>STAKE ROCKO</p>
                        </div>
                        <div class="recc recc_text clearfix">
                            <p class="grid_left">Total Staked</p>
                            <div class="grid_right">
                                <h4 id="totalStaked">0.00 ROCKO</h4>
                            </div>
                        </div>
                        <div class="recc recc_text clearfix">
                            <p class="grid_left">Start Time</p>
                            <div class="grid_right">
                                <h4 id="startTime">00:00:00 00:00:00</h4>
                            </div>
                        </div>
                        <div class="recc recc_text clearfix">
                                    <p class="grid_left">End Time</p>
                                    <div class="grid_right">
                                        <h4 id="endTime">00:00:00 00:00:00</h4>
                                    </div>
                                </div>
                        <div class="recc recc_text">
                            <ul class="custom_tabs text-center">
                                <li class=""><a href="javascript:void(0)"><span class="de">Details <i class="fas fa-angle-down"></i></span><span class="hi">Hide <i class="fas fa-angle-up"></i></span></a></li>
                            </ul>
                        </div>
                        <div style="clear: both;"></div>
                        <div class="tab-content-custom">
                            <div id="detail1" class="single_tab">
                                <div class="custom_table">
                                    <div class="clearfix">
                                    <div class="clearfix">
                                        
                                        <div class="col-sm-4 pull-right" id="">
                                            <div class="main_box_insm bottom_here">
                                            <div class="clearfix">
                                                    <div class="title">Withdraw</div>
                                                    <button class="btnbtn " disabled="disabled">Withdraw</button>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4 pull-right">
                                            <div class="main_box_insm grid_hide_box">
                                                <div class="clearfix">
                                                <div class="title">ROCKO  Earned</div>
                                                <div class="heightlight" id="TokenEarned">0</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4 pull-left">
                                            <div class="links">
                                                <p class="clearfix"><a class="pull-left" href="https://bscscan.com/address/0x707c7E99722D2d0241C3Fb5D50970E5B28c191E6" target="_blank">See ROCKO Info <i class="fas fa-share-square"></i></a></p>
                                                <p class="clearfix"><a class="pull-left" href="" target="_blank">View Project Site <i class="fas fa-share-square"></i></a></p>
                                                <p class="clearfix"><a class="pull-left" href="https://bscscan.com/address/0x6cB12c147a34cDB1CC16bdAFF4416F4173bB9737" target="_blank">View Contract <i class="fas fa-share-square"></i></a></p>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        $("#st_records").html(html1);
        $("#stake_Token").hide();
        $("#clb").html(`<button style="cursor:pointer" id="btn-connect">Wallet Connect</button>`);
        $("#TokenStake").html('0.00');
        $("#pendingReward").html('0.00');
        //console.log("cle=>",cle);
    }
    catch(error){
        //console.log("cle=>",cle);
    }
});