// Google Tag Manager boot script. Kept out of the 'use client' banner so the server layout can call it.
export const KEY = 'consent'
export const ALL = ['ad_storage', 'ad_user_data', 'ad_personalization', 'analytics_storage']

// Consent Mode v2: everything starts denied, GTM loads, and tags only set cookies after "Accept".
export function gtmBoot(id: string) {
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
gtag('consent','default',{${ALL.map((k) => `${k}:'denied'`).join(',')},wait_for_update:500});
try{if(localStorage.getItem('${KEY}')==='granted')gtag('consent','update',{${ALL.map((k) => `${k}:'granted'`).join(',')}})}catch(e){}
(function(w,d,s,l,i){w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f)})(window,document,'script','dataLayer',${JSON.stringify(id)});`
}
