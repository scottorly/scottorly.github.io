
import { geoPath, geoMercator, geoGraticule } from 'd3-geo'
import { geoTimes } from 'd3-geo-projection'
import { selectAll  } from 'd3-selection'
import { feature } from 'topojson-client'
import land from './land-10m.json'

const createMap = () => {
    const lands = feature(land, land.objects.land)
    const path = geoPath(geoTimes().fitExtent([[20, 0], [620, 420]], lands).scale(122))
    const graticuleGenerator = geoGraticule().step([10,10])
    const g = selectAll('#map')
    const graticules = selectAll('#graticules')

    g.selectAll('path')
        .data(lands.features)
        .join(
            enter => enter.append(d => (<path
                    className='mapPath'
                    d={path(d)}
                />)
            )
        )
    graticules
        .append('path')
        .datum(graticuleGenerator)
        .attr('d', path)
        .attr('class', 'mapPath')
}

export default createMap
