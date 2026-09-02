const modal = document.getElementById('modal');
function openGiveaway(name, fee, icon){
  document.getElementById('modalTitle').textContent = name;
  document.getElementById('modalFee').textContent = fee + ' VEs';
  document.getElementById('modalIcon').textContent = icon;
  modal.classList.add('show');
  document.body.style.overflow='hidden';
}
function closeModal(){
  modal.classList.remove('show');
  document.body.style.overflow='';
}
function confirmJoin(){
  alert('Demo only: your participation was recorded locally for this frontend demonstration.');
  closeModal();
}
modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });
