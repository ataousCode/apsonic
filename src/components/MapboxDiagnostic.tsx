// 'use client';

// import { useEffect, useState } from 'react';

// export default function MapboxDiagnostic() {
//   const [diagnostics, setDiagnostics] = useState({
//     token: '',
//     tokenValid: false,
//     mapboxLoaded: false,
//   });

//   useEffect(() => {
//     const checkMapbox = async () => {
//       const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
//       const tokenValid = token.startsWith('pk.') && token.length > 50;
      
//       let mapboxLoaded = false;
//       try {
//         const mapboxgl = await import('mapbox-gl');
//         mapboxLoaded = !!mapboxgl.default || !!mapboxgl;
//       } catch (error) {
//         console.error('Failed to load mapbox-gl:', error);
//         mapboxLoaded = false;
//       }
      
//       setDiagnostics({
//         token: token ? `${token.substring(0, 20)}...` : 'NOT SET',
//         tokenValid,
//         mapboxLoaded,
//       });

//       console.log('🔍 Mapbox Diagnostics:');
//       console.log('  Token:', token ? `${token.substring(0, 20)}...` : 'NOT SET');
//       console.log('  Token valid:', tokenValid);
//       console.log('  Mapbox loaded:', mapboxLoaded);
//     };
    
//     checkMapbox();
//   }, []);

//   return (
//     <div className="fixed bottom-4 right-4 z-50 glass-panel rounded-xl p-4 text-xs max-w-xs">
//       <h3 className="font-bold text-white mb-2">🔍 Mapbox Diagnostics</h3>
//       <div className="space-y-1 text-white/70">
//         <div className="flex items-center gap-2">
//           <span className={diagnostics.tokenValid ? 'text-green-400' : 'text-red-400'}>
//             {diagnostics.tokenValid ? '✅' : '❌'}
//           </span>
//           <span>Token: {diagnostics.token}</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className={diagnostics.mapboxLoaded ? 'text-green-400' : 'text-red-400'}>
//             {diagnostics.mapboxLoaded ? '✅' : '❌'}
//           </span>
//           <span>Mapbox GL loaded</span>
//         </div>
//       </div>
//       {!diagnostics.tokenValid && (
//         <div className="mt-3 p-2 bg-red-500/10 border border-red-500/30 rounded text-red-200">
//           ⚠️ Add token to .env.local and restart server
//         </div>
//       )}
//     </div>
//   );
// }

