$(function() {

    var fill = d3.scale.category20c();
    //var fill = d3.scale.ctm();

    var height = $(document).height();
    var width = $(document).width();

    var _words = [];

    var serverData = [];

    d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")

    function getData(success){

        $.ajax({
            url: "/words/",
            type:'GET',
            success: success
        });

    };
    
    setTimeout(function() {
        
        getData(function(words) {
            
            // Oooo these linear scale functions are nice :D
            var wordScale = d3.scale.linear().domain([0,20]).range([10,160]);
            var wordRotate = d3.scale.linear().domain([0,1]).range([-20,20]);
            
            d3.layout.cloud()
                .size([width, height])
                .words(words.map(function(word) {
                    return {
                        text: word.word,
                        count: word.count
                    };
                }))
                .font("Impact")
                .rotate(function() { return wordRotate(Math.random()); })
                .fontSize(function(d) { return wordScale(d.count); })
                .on("end", draw)
                .start();
                
        });
        
    },400);
    
    
    
    function draw(words) {

        d3.select("g")
            .attr("transform", "translate(" + width/2 + "," + height/2 + ")")
            .selectAll("text")
                .data(words)
                .enter().append("text")
                    .style("font-size", function(d) { return d.size + "px"; })
                    .style("font-family", "Impact")
                    .style("fill", function(d, i) { return fill(i); })
                    .attr("text-anchor", "middle")
                    .text(function(d) { return d.text; })
                    .attr("transform", function(d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .style('opacity', 0)
                    .transition()
                    .duration(1500)
                    
                .style('opacity', 1);

    };

    // function renderNewWords(words){

    //     d3.layout.cloud()
    //         .size([width, height])
    //         .words(words.map(function(d) {
    //                 return {text: d, size: 10 + Math.random() * 90};
    //             }))
    //         .padding(1)
    //         .rotate(function() { return ~~(Math.random() * 2) * 90; })
    //         .font("Impact")
    //         .fontSize(function(d) { return d.size; })
    //         .on("end", draw)
    //         .start();

    //     function draw(words) {

    //         _words = words;


    //         d3.select("g")
    //             .attr("transform", "translate(" + width/2 + "," + height/2 + ")")
    //             .selectAll("text")
    //             .data(words)
    //             .enter().append("text")
    //             .style("font-size", function(d) { return d.size + "px"; })
    //             .style("font-family", "Impact")
    //             .style("fill", function(d, i) { return fill(i); })
    //             .attr("text-anchor", "middle")
    //             .text(function(d) { return d.text; })
    //             .style('opacity', 0)
    //             .transition()
    //             .duration(500)
    //             .attr("transform", function(d) {
    //                 return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    //             })
    //             .style('opacity', 1)

    //     }

    // }

    // getData(function(data){
    //     renderNewWords(data);
    // });


     setTimeout(function(){

         d3.selectAll("text")
             .transition()
             .duration(500)
             .style('opacity', 0)

         setTimeout(function(){
             location.reload();
         }, 600);

     }, 5000)



});