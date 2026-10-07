const {test}=require('node:test');
const assert=require('node:assert/strict');
const core=require('../release/core.js');
test('numbered follower exports deduplicate and compare with following titles',()=>{
 const followers=core.usernames([{string_list_data:[{value:'Alice'},{value:'ALICE'}]}],'followers');
 const following=core.usernames({relationships_following:[{title:'alice'},{title:'bob'}]},'following');
 assert.deepEqual(core.compare(followers,following),{notFollowingBack:['bob'],mutual:['alice'],followersOnly:[]});
});
test('malformed records have a useful export-format error',()=>{
 for(const data of [null,{},[null],[{string_list_data:{value:'alice'}}]])assert.throws(()=>core.usernames(data,'followers'),/unsupported format/);
});
test('invalid usernames cannot appear in CSV and empty exports remain valid',()=>{
 assert.deepEqual(core.usernames([{string_list_data:[null,{value:'=HYPERLINK("x")'},{value:'<script>'},{value:'valid.name'}]}],'followers'),['valid.name']);
 assert.deepEqual(core.usernames([],'followers'),[]);
});
