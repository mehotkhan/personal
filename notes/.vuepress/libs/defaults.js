export const pubKeyCredParams = [
	{
		type: 'public-key',
		alg: -7,
	},
];

// Sets the amount of data the security key should send
// `none`, `direct`, or `indirect`
// https://twitter.com/herrjemand/status/1025806424742526976
// https://support.mozilla.org/en-US/kb/privacy-web-authentication?as=u&utm_source=inproduct
export const attestation = 'indirect';

export const timeout = 60000;

export const transports = ['usb', 'nfc', 'ble'];

export const credentialType = 'public-key';

export const authenticatorSelection = {
	authenticatorAttachment: 'cross-platform', // `platform` or `cross-platform`
	requireResidentKey: false,
	userVerification: 'required',
};
