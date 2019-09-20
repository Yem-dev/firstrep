$(document).ready( ()=>{
$('#option1').on('click',()=>{
    $('#loginf').show(); $('#signupf').hide();
}
)
$('#option2').on('click',()=>{
    $('#loginf').hide(); $('#signupf').show();
});

$('#signupcol').on('submit',(e)=>{
    e.preventDefault();
    let name= $('#lname').val();
    let email= $('#lemail').val();
    let pass= $('#lpass').val();
 let data={name,email,pass};
 $.ajax({
    method:"GET",
    url:"http://localhost:3000/profile?email="+email,
    success:(data)=>{
       if(data.length){alert('Please Login');$('#loginf').show(); $('#signupf').hide();}
       else{
        $.ajax({
            data:data,
            method:"POST",
            url:"http://localhost:3000/profile",
            success:()=>{
                sessionStorage.setItem('email',email);
                window.location='./blogpost.html';
            }
        })
       }
    }
})
 
 
 });
 $('#logincol').on('submit',(e)=>{
    e.preventDefault();
    let email= $('#semail').val();
    let pass= $('#spass').val();
 $.ajax({
    method:"GET",
    url:"http://localhost:3000/profile?email="+email+'&pass='+pass,
    success:(data)=>{
       if(data){sessionStorage.setItem('email',email);
       window.location='./blogpost.html';}else{alert('Invalid Login Details');}
    }
})
 
 
 });
 $('#postblog').on('submit',(e)=>{
    e.preventDefault();
    let email= sessionStorage.getItem('email');
    let content= $('#postcontent').val();
    let title= $('#posttitle').val();
    let data={title,email,content};
 $.ajax({
    method:"POST",
    url:"http://localhost:3000/posts",
    data:data,
    success:(data)=>{
        bloglist();
       alert('Post Created');
       $('#postcontent').val('');
       $('#posttitle').val('');
    }
})
 
 
 });
 comment=()=>{
    let commentcontent= $('#commentcontent').val();
    let cname= $('#cname').val();
    let postid= $('#postid').val();
    let data={commentcontent,postid,cname};
 $.ajax({
    method:"POST",
    url:"http://localhost:3000/comments",
    data:data,
    success:(data)=>{
        commentlist();
       $('#commentcontent').val('');
       $('#cname').val('');
    }
})
 
 
 }
 commentlist=()=>{
    $.ajax({
       method:"GET",
       url:"http://localhost:3000/comments",
       success:(data)=>{
           let test='<h3>Comments</h3>';
           for(let i=0;i<data.length;i++){
               let author=data[i]['cname'];
               let title= data[i]['commentcontent'];
               test+="<div style='color:#fff'>"+title+" ("+author+")</div><hr>";
           }
          
          $('#commentscol').html(test);
         
       }
   })
    
    
    };
    commentlist();
    
 bloglist=()=>{
 $.ajax({
    method:"GET",
    url:"http://localhost:3000/posts",
    success:(data)=>{
        let test='';
        for(let i=0;i<data.length;i++){
            let id=data[i]['id'];
            let title= data[i]['title'];
            test+="<tr onclick='showpost("+id+")'><td><a href='#'>"+title+"</a></td></tr>";
        }
       
       $('#bloglist').html(test);
      
    }
})
 
 
 };
 bloglist();
 showpost=(id)=>{
    $.ajax({
        method:"GET",
        url:"http://localhost:3000/posts/"+id,
        success:(data)=>{
            let test='';
                let id=data['id'];
                let title= data['title'];
                let content= data['content'];
                
                test+="<div class='col-lg-12'><div id='close' style='float:right;color:yellow' onclick='del("+id+")'>D</div><div id='close' style='float:right;color:green;margin:7px' onclick='edit("+id+")'>E</div><div id='close' style='float:right;color:red' onclick='replicate()'>X</div><h1>"+title+"</h1><br><div>"+content+"</div><form id='comment'>"
                +"<input id='cname' type='text' placeholder='Input Name' style='width:100%;padding:3px;border-radius:2px'></br>"+
                "<input id='postid' type='hidden' value='"+id+"' ></br>"+
                "<textarea id='commentcontent' placeholder='Comment' style='width:100%;padding:3px;border-radius:2px'></textarea>"+
                "<button type='submit' style='width:100%;padding:3px;border-radius:2px' onclick='comment()'>Comment</button>"+
                "</form></div><div id='commentscol'></div>";
            
           
                $('#postcreator').hide();$('#postcontent1').html(test);$('#postcontent1').show();commentlist();
          
        }
    })
 }
 update=(id)=>{
        let email= sessionStorage.getItem('email');
        let content= $('#postcontent').val();
        let title= $('#posttitle').val();
        let data={title,email,content};
     $.ajax({
        method:"PUT",
        url:"http://localhost:3000/posts/"+id,
        data:data,
        success:(data)=>{
            bloglist();
           alert('Post Updated');
           $('#postcontent').val('');
           $('#posttitle').val('');
        }
    })
    

 }
 $('#postupdate').on('submit',(e)=>{
     e.preventDefault();
     $('#postupdate').attr('id','postblog');
     update($('#uid').val());
 }
 )
 edit=(id)=>{
    $('#postcontent1').hide();$('#postcreator').show();
    $.ajax({
        method:"GET",
        url:"http://localhost:3000/posts/"+id,
        success:(data)=>{
            let test='';
                let id=data['id'];
                let title= data['title'];
                let content= data['content'];
                $('#postcontent').val(content);
                $('#posttitle').val(title);
                $('#uid').val(id);
                $('#postblog').attr('id','postupdate');}       
 })

            }
    del=(id)=>{
        
    $.ajax({
        method:"DELETE",
        url:"http://localhost:3000/posts/"+id,
        success:(data)=>{bloglist();
            alert('POST DELETED');


        }

    })}
 $('#welcone').html('Welcome'+sessionStorage.getItem('email'));
 replicate=()=>{$('#postcontent1').hide();$('#postcreator').show();}



})