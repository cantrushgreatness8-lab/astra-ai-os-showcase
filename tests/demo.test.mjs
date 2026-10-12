import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createTrace,selectProvider,resolveApproval} from '../src/demo.mjs';
test('private policy excludes cloud and paid providers',()=>assert.equal(selectProvider({localOnly:true,allowPaid:false}).id,'local'));
test('requests are bounded and validated',()=>{for(const bad of ['',null,'x'.repeat(501)]) assert.throws(()=>createTrace(bad));});
test('write pauses at explicit approval',()=>assert.equal(createTrace('Review inventory').at(-1).kind,'approval'));
test('decline never yields a report',()=>assert.equal(resolveApproval(false).kind,'blocked'));
test('only explicit boolean approval can resolve permission',()=>{assert.throws(()=>resolveApproval('yes'));assert.equal(resolveApproval(true).kind,'result');});
