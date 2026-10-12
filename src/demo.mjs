// Independently authored teaching model. No production provider or tool adapters.
export const providers = Object.freeze([
  { id: 'local', name: 'Local sample model', billing: 'free', local: true },
  { id: 'cloud', name: 'Cloud sample model', billing: 'paid', local: false },
]);
export function selectProvider(policy) {
  return providers.find(p => (!policy.localOnly || p.local) && (policy.allowPaid || p.billing === 'free')) ?? null;
}
export function createTrace(request, policy = {localOnly:true, allowPaid:false}) {
  if (typeof request !== 'string' || !request.trim() || request.length > 500) throw new Error('Enter a request of 1–500 characters.');
  const provider = selectProvider(policy);
  if (!provider) throw new Error('No eligible provider.');
  return [
    {kind:'request', title:'Receive request', detail:request.trim()},
    {kind:'route', title:'Select eligible provider', detail:`${provider.name} · ${provider.billing} · illustrative selection`},
    {kind:'memory', title:'Reconstruct bounded context', detail:'Read synthetic project note: demo inventory has 12 sample items.'},
    {kind:'tool', title:'Inspect sample inventory', detail:'inventory.read → synthetic result: 12 items. No real files accessed.'},
    {kind:'approval', title:'Request write permission', detail:'report.write requires visitor approval. Model choice grants no tool authority.'},
  ];
}
export function resolveApproval(approved) {
  if (typeof approved !== 'boolean') throw new Error('Approval must be explicit.');
  return approved
    ? {kind:'result', title:'Sample report generated', detail:'Synthetic inventory summary: 12 items reviewed. Sample report exists only in this page.'}
    : {kind:'blocked', title:'Write blocked', detail:'Permission declined. No report was generated; sample read results remain visible.'};
}
