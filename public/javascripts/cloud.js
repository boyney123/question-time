$(function() {

    var fill = d3.scale.ctm();

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
            url: "/moods/",
            type:'GET',
            success: function(words){
                serverData = words;
                success(words);
            }
        });

    };

    function renderNewWords(words){

        d3.layout.cloud()
            .size([width, height])
            .words(words.map(function(d) {
                    return {text: d, size: 10 + Math.random() * 90};
                }))
            .padding(1)
            .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

        function draw(words) {

            _words = words;


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
                .style('opacity', 0)
                .transition()
                .duration(500)
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style('opacity', 1)

        }

    }

    getData(function(data){
        renderNewWords(data);
    });


    setInterval(function(){


        d3.selectAll("text")
            .transition()
            .duration(500)
            .attr("transform", function(d) {
                return "translate(" + [0, 0] + ")rotate(" + 0 + ")";
            })
            .style("opacity", 0)
            .remove();

        setTimeout(function(){
            location.reload();
        }, 600)


        //renderNewWords(serverData);


    }, 5000);


});