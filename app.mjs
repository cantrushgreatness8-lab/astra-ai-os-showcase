import {createTrace,resolveApproval} from './src/demo.mjs';
let steps=[];
const output=document.querySelector('#trace'), approval=document.querySelector('#approval');
function render(){output.textContent=steps.map((s,i)=>`${i+1}. ${s.title}\n   ${s.detail}`).join('\n\n')||'Start a run to inspect its steps.';approval.hidden=steps.at(-1)?.kind!=='approval';}
document.querySelector('#run').addEventListener('submit',e=>{e.preventDefault();try{steps=createTrace(document.querySelector('#request').value);render()}catch(error){output.textContent=error.message;approval.hidden=true}});
for(const [id,allowed] of [['allow',true],['deny',false]])document.getElementById(id).addEventListener('click',()=>{if(steps.at(-1)?.kind!=='approval')return;steps.push(resolveApproval(allowed));render()});
document.querySelector('#reset').addEventListener('click',()=>{steps=[];render()});
