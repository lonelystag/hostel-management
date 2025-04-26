import{c as o,R as d,j as e}from"./index-B_kjqxqP.js";import{c as x}from"./cn-BNf5BS2b.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=o("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]),h=d.forwardRef(({className:l,options:n,label:a,error:r,onChange:t,...c},i)=>{const m=s=>{t==null||t(s.target.value)};return e.jsxs("div",{className:"space-y-2",children:[a&&e.jsx("label",{htmlFor:c.id,className:"block text-sm font-medium text-foreground",children:a}),e.jsxs("div",{className:"relative",children:[e.jsx("select",{ref:i,className:x("input appearance-none pr-10",r&&"border-error focus-visible:ring-error",l),onChange:m,...c,children:n.map(s=>e.jsx("option",{value:s.value,children:s.label},s.value))}),e.jsx("div",{className:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",children:e.jsx(u,{className:"h-4 w-4 text-muted-foreground"})})]}),r&&e.jsx("p",{className:"mt-1 text-sm text-error",children:r})]})});h.displayName="Select";export{h as S};
